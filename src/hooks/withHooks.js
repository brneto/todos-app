import React, { useState, useEffect } from 'react';

const useMedia = (query) => {
  let [matches, setMatches] = useState(
    window.matchMedia(query).matches
  );

  useEffect(() => {
    let media = window.matchMedia(query);
    if(media.matches !== matches) {
      setMatches(media.matches);
    }
  });

  return matches;
};

const App = () => {
  let small = useMedia('(max-width: 400px)');
  let large = useMedia('(min-width: 800px)');
  return (
    <div className="Media">
      <h1>Media</h1>
      <p>
        Small? {small ? 'Yep' : 'Nope'}.
      </p>
      <p>
        Large? {large ? 'Yep' : 'Nope'}.
      </p>
    </div>
  );
};

export default App;
