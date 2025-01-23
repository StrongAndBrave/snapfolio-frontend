'use client';

import React, { useState } from 'react';
import { useCreatePostMutation } from '../api/postsApi';

export const CreatePost = () => {
    const [description, setDescription] = useState('');
    const [childrenMetadata, setChildrenMetadata] = useState([{ uploadId: '2211' }]);
    const [createPost, { isLoading, isError, isSuccess, error }] = useCreatePostMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await createPost({ description, childrenMetadata }).unwrap();
            console.log('Post created successfully:', response);
            setDescription('');
            setChildrenMetadata([]);
        } catch (err) {
            console.error('Error creating post:', err);
        }
    };

    return (
        <div style={{ backgroundColor: 'white', color: 'black' }}>
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Enter post description"
                    rows={5}
                    style={{ width: '100%', marginBottom: '10px' }}
                />
                {/* Добавьте дополнительные поля для childrenMetadata, если нужно */}
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Creating...' : 'Create Post'}
                </button>
            </form>
            {isSuccess && <p style={{ color: 'green' }}>Post created successfully!</p>}
        </div>
    );
};
