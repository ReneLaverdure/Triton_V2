 class UI {
   constructor() {
    //tab UI elements
    this.headlineBtn = document.querySelector("#headlineBtn");
    this.everythingBtn = document.querySelector('#everythingBtn');
    this.sourcesBtn = document.querySelector('#sourcesBtn');

    //Sources UI elements
    this.selected_1 = document.querySelector('#selected-1');
    this.end_1 = document.querySelector('#end-1');

    //elements in drop down box
    this.dropDownContent_1 = document.querySelector('#dropdown-1');
    this.dropDownContent_2 = document.querySelector('#dropdown-2');

    //spinner
    this.loader = document.querySelector('.loader');

    //The UI for the searc h BUTTON
    this.headlinesSearch = document.querySelector('#headlines-search');
    this.everythingSearch = document.querySelector('#everything-search');
    this.sourcesSearch = document.querySelector('#sources-search');
    
    //Link to where output is appended
    this.newsFeed = document.querySelector('.news-feed');
    //element to where article html to written to
    this.output = '';

    //the everything tab title
    this.everthingTitle = document.querySelector('#et-title');
   }

   selectedItem(e){
    //init returned values from function
    let check = this.checkSeletedSources(e);
    const targetID = e.target.parentElement.parentElement.parentElement.id;

      //logic for adding new sourcees to EVERYTHING, check if max amount is picked and no doubles
      if(check[0] === false && check[1] < 16){
        this.addItem(e.target);
        }else if(check[0] === true){
        this.showAlert("News source already included", 'alert-warning', targetID);
        }else if(check[1] === 16){
        this.showAlert("Max number of specified sources reached", 'alert-danger', targetID);
      }
  }


  checkSources(){
        //grab boxes
        const box = document.querySelectorAll('.box');
        //create selected item array
        let selectedItems = [];
        //push each box id into the selected item array
        box.forEach(function(item){
          selectedItems.push(item.id);
        })

        return selectedItems 
  }


  //checks number of sources in the everything tab
  checkSeletedSources(e){
    let selectedItems = this.checkSources();
  
    //set up collision 
    let collision = false
  //check if newly slected item has already been selected if so return true
    selectedItems.forEach(function(item){
      if(item === e.target.id){
        return collision = true;
      }
    })

    //return true/false collision and number of items
    return [collision, selectedItems.length];
  }

//add selected items from the everything sources tab
  addItem(item){
      //create div
      const div = document.createElement('div');
      //add class
      div.className = 'box';
      //add id
      div.setAttribute("id", `${item.id}`)
      //append text
      div.innerHTML = `
      <p>${item.innerHTML}</p>
      <a href="#"><i class="fas fa-times"></i></a> 
      </div>
      `
      //insert div
      this.selected_1.insertBefore(div, this.end_1);
  };



  //delete selected new source
  deleteItem(item){
  //get click event target id
    const targetID = item.parentElement.parentElement.parentElement.id;
    //if the click target has a X icon delete item
  if(item.className === 'fas fa-times'){
    this.showAlert(`News source removed from search`, 'alert-warning', targetID);
    item.parentElement.parentElement.remove();
  }
}


  //Show alert function
 showAlert(message, className){
   this.clearAlert();
  //create div
  const div = document.createElement('div');
  //add classes
  div.className = `alert ${className}`;
  //add text
  div.appendChild(document.createTextNode(message));
  
  this.selected_1.insertAdjacentElement('afterend', div);
  
  //timeout after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 2000)
}

//alert for miss everything inputs
displayAlert(){
  this.clearAlert();
  //create div
  const div = document.createElement('div');
  //add classes
  div.className = `alert alert-danger`;
  //add text
  div.appendChild(document.createTextNode("Your search must include sources and/or a search query"));
  
  //insert div after everthing tab title
  this.everthingTitle.insertAdjacentElement('afterend', div);

    //timeout after 3 seconds
    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 3000)
}

  //clear alert message
  clearAlert(){
    const currentAlert = document.querySelector('.alert');
    if(currentAlert){
      currentAlert.remove();
    }
  }


  //create the articles and displaying them
  displayArticles(data){
   let articles = ``;
   //get date
   let date = new Date();


//for each article from the api fetch insert data into html format
    data.forEach(function(item){
      //if the article doesnt have a imagelink html is different
      if(item.urlToImage === null){
        //add to article var
        articles +=  `
        <div class="card">
        <div class="card__content">
            <h2>${item.title} </h2>
            <h4> ${item.description}</h4>
            <p> ${(item.content === null || item.content === "") ? "" : item.content}</p>
            ${(item.author === null || item.author === "") ? "" : `<p>Author: ${item.author}</p>`}
            <p>Publication: ${item.source.name} </p>
            <p>Published at: ${date.toString(item.publishedAt)}</p>
            <a href=${item.url} target="_blank" class="btn btn__primary">View Full Article</a>
        </div>
      </div>
        `
      }else{
         //add to article var
        articles +=  `
        <div class="card card__img">
        <div class="card__img--img">
        <img src="${item.urlToImage}">
        </div>
        <div class="card__img--content">
            <h2 class="highlighted">${item.title} </h2>
           
            <h4>${item.description}</h4>
          
            <p> ${(item.content === null || item.content === "") ? "" : item.content}</p>
            
            ${(item.author === null || item.author === "") ? "" : `<p>Author: ${item.author}</p>`}
            <p>Publication: ${item.source.name} </p>
            <p>Published at: ${date.toString(item.publishedAt)}</p>
            <a href=${item.url} target="_blank" class="btn btn__primary">View Full Article</a>
        </div>
      </div>
        `
      }

    })

    //add global putput var
    this.output += articles;
    //inject output to newsfeed html
    this.newsFeed.innerHTML = this.output;
  }

  //same as display articles but for the sources tab search
  displaySources(data){
    let articles = ``;
    //used to convert country codes from api fetch to its full length name 
    const languageConvertion = {
      "ar": "Arabic",
      "de": "German",
      "en": "English",
      "es": "Spanish",
      "fr": "French",
      "he": "Hebrew",
      "it": "Italian",
      "nl": "Dutch",
      "no": "Norwegian",
      "pt": "Portuguese",
      "ru": "Russian",
      "se": "Northern Sami",
      "zh": "Chinese"
    }
//for each article from the api fetch insert data into html format
    data.forEach(function(item){
      articles += `
      <div class="card">
      <div class="card__content">
          <h2>${item.name} </h2>
          <h4>${item.description}</h4>
          <p>Category: ${item.category}</p>
          <p>Language: ${languageConvertion[item.language]}</p>
          <p>Country: ${item.country.toUpperCase()} </p>
          <a href=${item.url} target="_blank" class="btn btn__primary">Visit Website</a>
      </div>
    </div>
      `
    })
        //add global putput var
    this.output += articles;
       //inject output to newsfeed html
    this.newsFeed.innerHTML = this.output;
  }

  // reset the news feed output var and the newfeed UI
  reset(){
    this.output = '';
    this.newsFeed.innerHTML = this.output;
  }

//inserts the load more button to allow for more artcles to be loaded
  insertButton(e){
    //create div
    const div = document.createElement('button');
    //give the button id of the saerch button, allowing for more searches
    const id = e.target.id;
    //give class names
    div.className = 'btn btn-load';
    //append inner text
    div.appendChild(document.createTextNode("Load More"));
    //set button id
    div.setAttribute('id', id);
    //add to newfeed
    this.newsFeed.insertAdjacentElement('beforeend', div);
  }


  displaySpinner(){
    this.loader.style.display = "block";
  }

  removeSpinner(){
    this.loader.style.display = "none";
  }

  //spinner for the load more button
  addBotSpinner(){
    //create div
    const div = document.createElement('div');
    //add class name
    div.className = "loader";
    //add id
    div.setAttribute('id', 'bot-loader');
    //get the load more button
    const load_more = document.querySelector('.btn-load');
    //insert element
    this.newsFeed.insertBefore(div, load_more)

  }


  displayBotSpinner(){
    const bot_loader = document.querySelector('#bot-loader');
    bot_loader.style.display = "block";
  }

  removeBotSpinner(){
    const bot_loader = document.querySelector('#bot-loader');
    bot_loader.style.display = "none";
  }

  //display message if the search returns no articles  
  badSearch(message){
    //create div
    const div = document.createElement('div');
    //add class names
    div.className = "alert alert-danger";
    //append text node to div
    div.appendChild(document.createTextNode(message));
    //get the load more button
    const load_more = document.querySelector('.btn-load');
    //insert into html
    this.newsFeed.insertBefore(div, load_more)
    //remove alert after 3 seconds
    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 3000)
  }

  //logic for the tabs
 openPage(tabName, element){
  let tabcontent, tablinks;
  //get all elements with class=tabcontent
  tabcontent = document.querySelectorAll('.tabcontent');
  //hide all tab 
  tabcontent.forEach(function(tab){
    tab.style.display = "none";
  })

  //go background to default button background color
  tablinks = document.querySelectorAll(".tablink");
  tablinks.forEach(function(tab){
    tab.style.backgroundColor = "white";
    tab.style.color = 'black';
  })

  //show specific tab content
  document.getElementById(tabName).style.display = 'block';

  //add color to button of used tab
  element.style.backgroundColor = "#3697af";
  element.style.color = 'white';

}

 }
 
