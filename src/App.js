import React from 'react';

const App = () => {
  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 1,
      objectID: 1,
    },
  ];
  // array deconstructing
  // useStat() returns those two vars, which is why we deconstruct it
  // searchTerm is current stae, setSearchTerm is a functiion to UPDATE state
  const [searchTerm, setSearchTerm] = React.useState('React');

  // A
  const handleSearch = event => {
    // C
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>
      
      <Search search={searchTerm} onSearch={handleSearch}/>

      <hr />
      <List list={searchedStories} />
    </div>
  );
};

const Search = (props) => (
      <div>
          <label htmlFor="search">Search: </label>
          <input
            id="search"
            type="text"
            value={props.search}
            onChange={props.onSearch}
          />
          <p>
            Searching for <strong>{props.search}</strong>
          </p>
      </div> 
);

// instead of using props I can deconstruct w/ the {} in the declaration
// const List = list => and props.map.(item => ) is the other way
const List = ({list}) =>
  list.map(item => (
    <div key={item.objectID}>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
    </div>
  ));

export default App;