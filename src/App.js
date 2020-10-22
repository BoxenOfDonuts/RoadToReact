import React from 'react';

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

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
  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search',
    'React'
    );

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <InputWithLabel
        id="search"
        label="Search"
        value={searchTerm}
        type="text"
        onInputChange={handleSearch}      
      >
        <strong>Search:</strong>
        </InputWithLabel>
      <hr />
      <List list={searchedStories} />
    </div>
  );
};

const InputWithLabel = ({
  id,
  label,
  value, 
  type='text',
  onInputChange,
  children
}) => (
  <>
    <label htmlFor={id}>{children}</label>
    &nbsp;
    <input
      id={id}
      type={type}
      value={value}
      onChange={onInputChange}
    />
  </>

);

// same as List, deconstruct w/ {}
// otherwise const Search = props => {
//  const { search, onSearch } = props 
//}
const Search = ({ search, onSearch }) => (
  <>
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
  </>
);

// instead of using props I can deconstruct w/ the {} in the declaration
// const List = list => and props.map.(item => ) is the other way
const List = ({list}) =>
  // spread on left side of an assignment, spread on the right
  list.map(item => < Item key={item.objectID} item={item}/>);
   
const Item = ({ item }) => (
  <div>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
  </div>
);

export default App;