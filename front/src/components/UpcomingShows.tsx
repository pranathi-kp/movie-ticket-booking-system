import React, { useEffect, useState } from 'react';
import { getUpcomingShows } from '../api/movieApi';
import { Showtime } from '../types/models';

const UpcomingShows: React.FC = () => {
  const [upcomingShows, setUpcomingShows] = useState<Showtime[]>([]);

  useEffect(() => {
    async function fetchUpcomingShows() {
      const data = await getUpcomingShows();
      setUpcomingShows(data);
    }
    fetchUpcomingShows();
  }, []);

  return (
    <div className="upcoming-shows">
      <h2 className="text-xl font-bold mb-4">Upcoming Shows</h2>
      <ul>
        {/* {upcomingShows.map((show) => (
          <li key={show.id} className="mb-2">
            {show.movie.name} - {new Date(show.startTime).toLocaleString()}
          </li>
        ))} */}
      </ul>
    </div>
  );
};

export default UpcomingShows;
