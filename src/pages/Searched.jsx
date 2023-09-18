import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Card } from './Cuisine';
import { styled } from 'styled-components'
import { Link } from 'react-router-dom';


function Searched() {

    const [searchedRecipes, setSearchedRecipes] = useState([]);
    let params = useParams();
    
    const getSearched = async (query) =>{
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=10&query=${query}`);
        const recipes = await data.json();
        setSearchedRecipes(recipes.results)
    }

    useEffect(()=>{
        getSearched(params.search);
    }, [params.search])

  return (
    <Grid>
        {searchedRecipes.map((item) =>{
            return(
                <Card key={item.id}>
                  <Link to={'/recipe/'+ item.id}>
                    <img src={item.image} alt={item.title}/>
                    <h4>{item.title}</h4>
                  </Link>
                </Card>
            )
        })}
        
    </Grid>
  )
}




export default Searched