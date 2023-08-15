'use client';

import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className="mt-16 prompt_layout">
            {data.map((post) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    );
}

const Feed = () => {
    const [searchText, setSearchText] = useState('');
    const [allPosts, setAllPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchTimeout, setSearchTimeout] = useState(null);

    const filterPosts = (searchText) => {
        const filteredPrompts = allPosts.filter((p) => {
            return p.prompt.includes(searchText)
            || p.tag.includes(searchText)
            || p.creator.username.includes(searchText)
        });
        return [].concat(filteredPrompts);
    }

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);
        setSearchTimeout(() => {
            const searchResult = filterPosts(e.target.value);
            setFilteredPosts(searchResult);
        }, 500);
    }

    const handleTagClick = (tag) => {
        setSearchText(tag);
        const searchResult = filterPosts(tag);
        setFilteredPosts(searchResult);
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/prompt');
            const data = await response.json();

            setAllPosts(data);
        }
        fetchPosts();
    }, []);

    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    type="text"
                    placeholder="Search for a tag or username"
                    value={searchText}
                    onChange={handleSearchChange}
                    className="peer search_input"
                />
            </form>
            {searchText ? (
                <PromptCardList
                    data={filteredPosts}
                    handleTagClick={handleTagClick}
                />
            )
            : (
                <PromptCardList
                    data={allPosts}
                    handleTagClick={handleTagClick}
                />
            )}
        </section>
    )
}

export default Feed
