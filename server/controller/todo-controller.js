import Todo from '../model/Todo.js';

export const addTodo = async (request, response) => {
    try {
        const { data, priority = 'medium', tags = [] } = request.body;
        
        const newTodo = await Todo.create({
            data: data.trim(),
            priority,
            tags,
            createdAt: Date.now()
        });

        await newTodo.save();

        // Emit real-time update
        const io = request.app.get('io');
        io.emit('todoCreated', newTodo);

        return response.status(200).json(newTodo);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

export const getAllTodos = async (request, response) => {
    try {
        const page = parseInt(request.query.page) || 1;
        const limit = parseInt(request.query.limit) || 50;
        const skip = (page - 1) * limit;

        const todos = await Todo.find({})
            .sort({ 'createdAt': -1 })
            .skip(skip)
            .limit(limit);

        const total = await Todo.countDocuments();

        return response.status(200).json({
            todos,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

export const toggleTodoDone = async (request, response) => {
    try {
        const todoRef = await Todo.findById(request.params.id);
        
        if (!todoRef) {
            return response.status(404).json({ message: 'Todo not found' });
        }

        const todo = await Todo.findOneAndUpdate(
            { _id: request.params.id },
            { 
                done: !todoRef.done,
                updatedAt: Date.now()
            },
            { new: true }
        );

        // Emit real-time update
        const io = request.app.get('io');
        io.emit('todoUpdated', todo);

        return response.status(200).json(todo);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

export const updateTodo = async (request, response) => {
    try {
        const { data, priority, tags } = request.body;
        
        const updateData = {
            updatedAt: Date.now()
        };
        
        if (data !== undefined) updateData.data = data.trim();
        if (priority !== undefined) updateData.priority = priority;
        if (tags !== undefined) updateData.tags = tags;

        const todo = await Todo.findOneAndUpdate(
            { _id: request.params.id },
            updateData,
            { new: true }
        );

        if (!todo) {
            return response.status(404).json({ message: 'Todo not found' });
        }

        // Emit real-time update
        const io = request.app.get('io');
        io.emit('todoUpdated', todo);

        return response.status(200).json(todo);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

export const deleteTodo = async (request, response) => {
    try {
        const todo = await Todo.findByIdAndDelete(request.params.id);
        
        if (!todo) {
            return response.status(404).json({ message: 'Todo not found' });
        }

        // Emit real-time update
        const io = request.app.get('io');
        io.emit('todoDeleted', todo);

        return response.status(200).json(todo);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

export const searchTodos = async (request, response) => {
    try {
        const { q: query } = request.query;
        const page = parseInt(request.query.page) || 1;
        const limit = parseInt(request.query.limit) || 20;
        const skip = (page - 1) * limit;

        if (!query || query.trim().length === 0) {
            return response.status(400).json({ message: 'Search query is required' });
        }

        // Use MongoDB text search
        const todos = await Todo.find(
            { $text: { $search: query } },
            { score: { $meta: 'textScore' } }
        )
        .sort({ score: { $meta: 'textScore' }, createdAt: -1 })
        .skip(skip)
        .limit(limit);

        const total = await Todo.countDocuments({ $text: { $search: query } });

        return response.status(200).json({
            todos,
            query,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        return response.status(500).json(error.message);
    }
}