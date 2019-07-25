 const ui = new UI,
       news = new News;
 
 // ============ tab buttons listeners ============ 
// ===============================================
//headline tab
ui.headlineBtn.addEventListener('click', () =>{
  ui.openPage('headlines', headlineBtn);
});
//everything tab
ui.everythingBtn.addEventListener('click', () => {
  ui.openPage('everything', everythingBtn);
});
//sources tab
ui.sourcesBtn.addEventListener('click', () =>{
  ui.openPage('sources', sourcesBtn);
});

//Setting the default tab as headline
document.getElementById("headlineBtn").click();



// headline sources ui logic allows users to add certain new sources to their search
ui.dropDownContent_1.addEventListener('click', (e) => {
  if(e.target.classList == 'item'){
    ui.selectedItem(e);
  }
});

//delete selected items for the headline sources
ui.selected_1.addEventListener('click', (e) =>{
  ui.deleteItem(e.target)
})



// ========= Event Listeners for all the search options ==========
// ===============================================================
// ===============================================================

// ========== event listeners for the SEARCH BUTTON Headline ==========
ui.headlinesSearch.addEventListener('click', (e) => {
  //resets global variable of calledTimes which dictats what page is called
  news.reset();
  //reset output variable that is append to the newfeed which display articles
  ui.reset();
  ui.displaySpinner();
  //timeout to display spinner longer, for better UX
setTimeout(function(){
    news.getNews(e)
    .then(response => {
      //checks reponse status and length of array to ensure it returned articles
      if(response.data.status === 'ok' && response.data.articles.length > 0){
        ui.removeSpinner();
        ui.displayArticles(response.data.articles)
        ui.insertButton(e);
        //if status is ok but no articles are returned
      }else if(response.data.status === 'ok' && response.data.articles.length === 0){
        //insert alert with server error
        //remove any previous search 
        news.reset();
        ui.reset();
        ui.removeSpinner();
        ui.badSearch("Your search query has returned no articles. Time to read up on other topics.");
      }

  })
}, 1000)


  //prevent the page refresh on button click
  e.preventDefault();
})


// ========== event listeners SEARCH BUTTON everything ==========
ui.everythingSearch.addEventListener('click', (e) => {
  //gets the selected sources for the sources
  const selectedItems = ui.checkSources();
  const search = document.querySelector('#et-search').value;
  //if there no items in he sources and no query searched display alert
  if(selectedItems.length === 0 && search === ""){
    ui.displayAlert();
  }else{
     //resets newfeed and output
    news.reset();
    ui.reset();
    ui.displaySpinner();
    //timeout to display spinner longer, for better UX
    setTimeout(function(){
      news.getNews(e)
      .then(response => {
        //checks reponse status and length of array to ensure it returned articles
        if(response.data.status === 'ok' && response.data.articles.length > 0){
          ui.removeSpinner();
          ui.displayArticles(response.data.articles)
          ui.insertButton(e);
          //if status is ok but no articles are returned
        }else if(response.data.status === 'ok' && response.data.articles.length === 0){
          //insert alert with server error
          news.reset();
          ui.reset();
          ui.removeSpinner();
          ui.badSearch("Your search query has returned no articles. Time to read up on other topics.");
        }
  
      })
    }, 1000)

  }

   //prevent the page refresh on button click
  e.preventDefault();
})




// ========== event listeners SEARCH BUTTON Sources ==========
ui.sourcesSearch.addEventListener('click', (e) => {
  //resets newfeed and output
  news.reset();
  ui.reset();
  ui.displaySpinner();
  //timeout to display spinner longer, for better UX
  setTimeout(function(){
    news.getNews(e)
    .then(response => {
      //checks reponse status and length of array to ensure it returned sources
      if(response.data.status === 'ok' && response.data.sources.length > 0){
        ui.removeSpinner();
        ui.displaySources(response.data.sources);
        //if status is ok but no sources are returned
      }else if(response.data.status === 'ok' && response.data.sources.length === 0){
        news.reset();
        ui.reset();
        ui.removeSpinner();
        ui.badSearch("Unfortunately we have no news sources protaining to your search.");
      }
    })
  }, 1000)

  //prevent the page refresh on button click
  e.preventDefault();
})



//event listeners for the the load-more button, loads more articles realted tothe search
ui.newsFeed.addEventListener('click', (e) => {
  //checks the id of the click target 
  if(e.target.id === 'headlines-search' || e.target.id === 'everything-search'){
    news.loadMore()
    ui.addBotSpinner();
    ui.displayBotSpinner()
    //timeout to display spinner longer, for better UX
    setTimeout(function(){
      news.getNews(e)
      .then(response => {
        //checks reponse status and length of array to ensure it returned articles
        if(response.data.status === 'ok' && response.data.articles.length > 0){
          ui.removeBotSpinner();
          ui.displayArticles(response.data.articles);
          ui.insertButton(e);
          //if status is ok but no articles are returned
        }else if(response.data.articles.length === 0 && response.data.status === 'ok'){
          ui.removeBotSpinner();
          ui.badSearch("Your search query has ran out of articles. Time to read up on other topics.");
        }
      })
    }, 1000)

  }
})
 
 
