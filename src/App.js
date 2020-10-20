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

// same as List, deconstruct w/ {}
// otherwise const Search = props => {
//  const { search, onSearch } = props 
//}
const Search = ({ search, onSearch }) => {
  return(
      <div>
          <label htmlFor="search">Search: </label>
          <input
            id="search"
            type="text"
            value={search}
            onChange={onSearch}
          />
          <p>
            Searching for <strong>{search}</strong>
          </p>
      </div> 
  );
};

// instead of using props I can deconstruct w/ the {} in the declaration
// const List = list => and props.map.(item => ) is the other way
const List = ({list}) =>
  // spread on left side of an assignment, spread on the right
  list.map(({objectID, ...item}) => < Item key={item.objectID} {...item} />);
   
const Item = ({ title, url, author, num_comments, points }) => (
  <div>
    <span>
      <a href={url}>{title}</a>
    </span>
    <span>{author}</span>
    <span>{num_comments}</span>
    <span>{points}</span>
  </div>
);

export default App;