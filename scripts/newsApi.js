class News{
  constructor(){
    //global var to determine page thats displayed
    this.calledTimes = 1;
    //init UI object
    const ui = new UI;
  }

  //========= setup and return api url endpoint to request data ========= 
  //=====================================================================
  //=====================================================================
  setHeadlineSearch(){
    //ui elements for setting the url values
    const country = document.querySelector('#hl-country').value;
    const category = document.querySelector('#hl-category').value;
    const search = document.querySelector('#hl-search').value;

    //the url with value injected
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&categroy=${category}&q=${search}&pagesize=5&page=${this.calledTimes}&apiKey=ad1805b7804e4ecf9bab2d0c27fbf50a`;
    
    return url
  }

  setEverythingSearch(){
    //ui elements for setting the url values
    const language = document.querySelector('#et-language').value;    
    const sort = document.querySelector('#et-sort').value;
    const search = document.querySelector('#et-search').value;

    //check what sources that are selected
    let selectedItems = ui.checkSources();
    //convert array to strings for search
    selectedItems = selectedItems.toString();

     //the url with value injected
    const url = `https://newsapi.org/v2/everything?q=${search}&sortBy=${sort}&language=${language}&sources=${selectedItems}&pagesize=5&page=${this.calledTimes}&apiKey=ad1805b7804e4ecf9bab2d0c27fbf50a`

    return url
  }

  setSourcesSearch(){
    //ui elements for setting the url values
    const country = document.querySelector('#src-country').value;
    const category = document.querySelector('#src-category').value;
        //the url with value injected
    const url = `https://newsapi.org/v2/sources?country=${country}&category=${category}&apiKey=ad1805b7804e4ecf9bab2d0c27fbf50a`

    return url
  }
  
  //=====================================================================
  //=====================================================================

  //determine if the search is coming from the TopHeadlines, Everything or sources tab
  sort(e){
    //gets click target id
    const target = e.target.id;

    //returns the function that creates the api url endpoint
    if(target === 'headlines-search' ){
      return this.setHeadlineSearch();
    }else if(target === 'everything-search'){
      return this.setEverythingSearch();
    }else if(target === "sources-search"){
      return this.setSourcesSearch();
    }
  }

//gets the news/sources from api
  async getNews(e){
    //gets url
    const url = this.sort(e);
    //send the fetch request
    const dataResponse = await fetch(url);
    //converts the data into JSON
    const data = await dataResponse.json()

    //creates the response object with data and url endpoint of search 
    let response = {
      data: data,
      url : url
    } 
   
    //returns object
    return response;

  }

  //increases the calledTimes value to track what page to load 
  loadMore(){
    this.calledTimes++;
  }

  //when users makes a new search reset the calledTimes value
  reset(){
    this.calledTimes = 1;
   
  }
  
}