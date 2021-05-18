import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';

import { MovieCard } from '../movie-card/movie-card';

import VisibilityFilterInput from '../visibility-filter-input/visbility-filter-input' ;

import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
    const { visibilityFilter } = state;
    return { visbilityFilter };
};

function MovieList(props) {
    const { movies, visibilityFilter } = props;
    let filteredMovies = movies;

    if (visibilityFilter !== '') {
        filteredMovies = movies.filter(m => m.Title.toLowerCase().includes
            (visibilityFilter.toLowerCase()));
    }

    if (!movies) return <div clsassName="main-view"/>;

    return <>
    <Col md={12} style={{ margin: '1em' }}>
        <VisibilityFilterInput visibilityFilter={visbilityFilter}/>
        </Col>
        {filteredMovies.map(m => (
        <Col md={3} key={m_id}>
            <MovieCard movie={m}/>
        </Col>
    ))}
    </>;
}

export default connect(mapsStateToProps)(MoviesList);