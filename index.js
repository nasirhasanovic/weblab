
    const autoCompleteRight = {
      renderOption(movie){
        const imgSource = movie.Poster === 'N/A' ? '' : movie.Poster;
         return `
         <img src ="${movie.Poster}"/>
         ${movie.Title} (${movie.Year}) 
         `;
      },
      
      inputValue (movie){
        return movie.Title;
      },
      async fetchData(searchTerm) {
        const respons = await axios.get ('http://www.omdbapi.com/',{
        params: {
        apikey:'1c1e89f7',
        s: searchTerm
        }
        });
        if (respons.data.Error){
          return[];
        };
         return respons.data.Search;
        }

    }
    autoCompletefunc({
      ...autoCompleteRight,
      root: document.querySelector('#left-autocomplete'),
      optionSelect (movie) {
        document.querySelector('.tutorial').classList.add ('is-hidden'); 
        movieSelect(movie, document.querySelector('#left-summary'), 'left');
      }

     
    });
    autoCompletefunc({
      ...autoCompleteRight,
      root: document.querySelector('#right-autocomplete'),
      optionSelect (movie) {
        document.querySelector('.tutorial').classList.add ('is-hidden'); 
        movieSelect(movie, document.querySelector('#right-summary'), 'right');
      }
     
    });
    let lefMovie;
    let rightMovie;

const movieSelect = async  (movie, summaryOfMovie, side) => {
   const response = await axios.get ('http://www.omdbapi.com/',{
    params: {
    apikey:'1c1e89f7',
    i: movie.imdbID

    }
    });
    summaryOfMovie.innerHTML = movieTemplate(response.data);
    if (side==='left'){
      lefMovie=response.data;
    } else {
      rightMovie=response.data;
    }
    if( lefMovie && rightMovie){
      comperisonCheck();
    }
}; 
const comperisonCheck =() => {
  const leftSide = document.querySelectorAll('#left-summary .notification');
  const rightSide = document.querySelectorAll('#right-summary .notification');
  leftSide.forEach((leftStat, index)=> {
    const rightStat=rightSide[index];
    const leftSideValue= leftStat.dataset.value;
    const rightSideValue= rightStat.dataset.value;
    if (rightSideValue > leftSideValue) {
      leftStat.classList.remove ('is-primary');
      leftStat.classList.add ('is-warning');
    } else {
      rightStat.classList.remove('is-primary');
      rightStat.classList.add('is-warning');
    }
    

  });
}
 const movieTemplate = movieDetails => {
   const moneyMade = parseInt (movieDetails.BoxOffice.replace(/\$/g, '').replace(/,/g, ''));
   const metascore = parseInt(movieDetails.Metascore);
   const imdbRate = parseFloat(movieDetails.imdbRating);
   const imdbVotes = parseInt(movieDetails.imdbVotes.replace(/,/g,'')); 
   
   
   return `<article class= "media"> 
            <figure class= "media-left"> 
            <p class = "image">
            <img  src="${movieDetails.Poster}">
             </p> 
            </figure>
            <div class= "media-content">
            <div class="content">
            <h1> ${movieDetails.Title}</h1>
            <h4> ${movieDetails.Genre}</h4>
            <p> ${movieDetails.Plot}</p>
            </div>
            </div>
            </article>
            <article  class = "notification is-primary">
            <p class = "title">${movieDetails.Awards} </p>
            <p class = "subtitle"> Awards </p>
            </article> 
            <article data-value=${moneyMade} class = "notification is-primary">
            <p class = "title">${movieDetails.BoxOffice} </p>
            <p class = "subtitle"> Box office  </p>
            </article>
            <article data-value=${metascore} class = "notification is-primary">
            <p class = "title">${movieDetails.Metascore} </p>
            <p class = "subtitle"> Metascore </p>
            </article>
            <article data-value=${imdbRate} class = "notification is-primary">
            <p class = "title">${movieDetails.imdbRating} </p>
            <p class = "subtitle"> IMDB </p>
            </article>
            <article data-value=${imdbVotes} class = "notification is-primary">
            <p class = "title">${movieDetails.imdbVotes} </p>
            <p class = "subtitle"> IMDB votes </p>
            </article>

   `;
 };
