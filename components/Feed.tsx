
import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet} from 'react-native';
import PromptCard from './PromptCard'; 

const PromptCardList = ({ data, handleclick }: { data: any[]; handleclick: (tagName: string) => void }) => {
  return (
    <View style={styles.promptLayout}>
      {data.map((post) => (
        <PromptCard key={post._id} post={post} handleclick={handleclick} />
      ))}
    </View>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const [searchedResults, setSearchedResults] = useState<any[]>([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('https://prompt-hub-sigma.vercel.app/api/prompt');
      const data = await response.json();
      setAllPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext: string) => {
    const regex = new RegExp(searchtext, 'i');
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (text: string) => {
    clearTimeout(searchTimeout);
    setSearchText(text);

  
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(text);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleclick = (tagName: string) => {
    setSearchText(tagName);
    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <View style={styles.feed}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a tag or a username"
          value={searchText}
          onChangeText={handleSearchChange}
          required
        />
      </View>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList data={searchedResults} handleclick={handleclick} />
      ) : (
        <PromptCardList data={allPosts} handleclick={() => {}} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  feed: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  searchInput: {
    width: '100%',
    height: 40,
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
    fontSize: 16,
  },
  promptLayout: {
    marginTop: 16,
  },
});

export default Feed;
