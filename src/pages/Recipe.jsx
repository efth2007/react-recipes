import React from 'react'
import { useEffect, useState } from 'react';
import styled from "styled-components"
import { useParams } from 'react-router-dom';

function Recipe() {

    let params = useParams();
    const [details, setDetails] = useState({})
    const [activeTab, setActiveTab] = useState("instructions")

    const fetchDetails = async()=>{
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
        const detailData = await data.json();
        setDetails(detailData)
    }

    useEffect(()=>{
        fetchDetails(params.name);
      }, [params.name])


  return (
    <DetailWrapper>
    <div className='recipe-image'>
        <h2>{details.title}</h2>
    <img src={details.image} alt={details.title} /></div>
    <Info>
        <Button className={activeTab === 'instructions' ? 'active' : ''} onClick={()=>{setActiveTab('instructions')} }>Instructions</Button>
        <Button className={activeTab === 'ingredients' ? 'active' : ''} onClick={()=>{setActiveTab('ingredients')} }>Ingredients</Button>
        { activeTab === 'instructions' && (
         <div>
            <h3 dangerouslySetInnerHTML={{__html: details.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{__html: details.instructions }}></h3>
        </div>
        )}

        { activeTab === 'ingredients' && (
        <ul>
            {details.extendedIngredients.map((ingr) =>(
               <h3><li key={ingr.id}>{ingr.original}</li></h3> 
            ))}
        </ul>
                )}

        </Info> 
    
    </DetailWrapper>
  )
}

const DetailWrapper = styled.div`
margin-top: 10rem;
margin-bottom: 5rem;
display: flex;

.active {
  background: linear-gradient(35deg, #494949, #313131);
  color: white;
}

h2 {
  margin-bottom: 2rem;
  margin-left:2rem
}

li {
  font-size: 1.2rem;
  line-height: 2.5rem;
}
ul {
  margin-top: 2rem;
}

.recipe-image {

 
  img {
    border-radius: 2rem;
    min-height: 25rem;
  }
}



`

const Button = styled.button`
padding: 1rem 2rem;
color: #313131;
background: white;
border: 2px solid black;
border-radius: 0.5rem;
margin-right: 2rem;
font-weight: 600;
cursor: pointer;
`

const Info = styled.div`
margin-left: 10rem
`





export default Recipe