



// This Vue component is a single photo component.  Having a cart object / cart method here would make no sense, since
// the cart object would just be repeating itself over and over and each photo would have its own cart.  Thus, the cart
// would be best served in the global Vue instance below **
/*
Vue.component('photo', {
	template: `
		<div class="photo">

			<div class="photo-image">
				<figure id=family-pic>
					<img id="pic" :src='image'>
					<figcaption id=family-pic_cpn> {{figCaption}} </figcaption>
				</figure>

			</div>

			<div class="photo-info">
				<h1 :style="styleObject">	
					{{ title }}		
				</h1>
				<content class='photo-list'>
					<div class="family-photos"
					     v-for="(variant, index) in variants"
						 :key="variant.pictureId"
						 @mouseover="updatePhoto(index)">{{variant.alt}}
					</div>
				</content>

			</div>
		</div>
	`,
	data() {
		return {
			styleObject:{
				backgroundColor: 'black',
				color: 'yellow',
				border: '2px solid white',
				padding: '10px',
				fontSize: '50px',
				position: 'relative'
			},
			family_caption: 'Family',
			photo: 'Photos',
			selectVariant: 0,
			variants: [
				{
				pictureId: 1,
				variantImage: 'images/wife_n_i.jpg',
				alt: 'My Wife, Sharon, And I in St Lucia',
				caption: 'My wife and I left the continent for the first time ever, going to St. Lucia on our honeymoon in June 2017'
				},
				{
				pictureId: 2,
				variantImage: 'images/best_man_n_i.jpg',
				alt: 'Best Man And I',
				caption: `I've always had the shy type personality and have always tried my best to surprise people!  In high school,
				I bleached my hair and showed up to the prom in a white coat and black shirt.  Needless to say, I stood out and gave
				something for people to remember.  Here, in the above photo, I had selected top hats and canes for all the groomsmen
				and made my way down the alley with ZZ Top's 'Sharp Dressed Man'!  Furthermore, Jos A Bank, the place where I got the 
				tuxedo, said that I was the first to have rented the hats and canes. :)  The picture above is my best man, my dad, and I.
				`
				},
				{
				pictureId: 3,
				variantImage: 'images/wedding_day2.jpg',
				alt: 'Bride and Groomsmen',
				caption: `
				Sharp dressed groomsmen.  From left to right: My cousin, Tom, me, my wife, Sharon, my dad, Tom, and my uncle, James.
				`
				},
				{
				pictureId: 4,
				variantImage: 'images/family_include_grandma.jpg',
				alt: 'Family, Including Grandma',
				caption: 'From left to right: Me, my grandmother, Kathy, my sister, Mandy, and my brother-in-law, Kyle'
				}
			]

		}
	},
	methods: {
		updatePhoto(index){
			this.selectVariant = index
		}
	},
	computed: {
		title() {
			return this.family_caption + " " + this.photo
		},
		image(){
			return this.variants[this.selectVariant].variantImage
		},
		figCaption(){
			return this.variants[this.selectVariant].caption
		}
	}
})


// This Vue instance is global
var app = new Vue(	{
	el:'#app',  // attach instance of Vue to the DOM
})
*/



var skills_url = "https://stmarple.github.io/project/data/skills.json";
document.getElementById('btn-right').addEventListener("click", button_click_event);
document.getElementById('btn-left').addEventListener("click", button_click_event);

function button_click_event(event) {
  switch(event.currentTarget.id) {
    case "btn-left":
      fetchdata("table-left");
      break;
    case "btn-right":
      fetchdata("table-right");
      break;
  }
}


// AJAX
function fetchdata(leftright) {
  
	httpRequest = new XMLHttpRequest();  // Create XMLHttpRequest object

	if (!httpRequest) {
		alert('Exiting : Cannot create an XMLHTTP Instance');
		return false;
	}
	httpRequest.onreadystatechange = function httpreq_callback() {
    	if(httpRequest.readyState == XMLHttpRequest.DONE && httpRequest.status === 200) {
			responseObject = JSON.parse(httpRequest.responseText);

			switch(leftright) {
				case "table-left":
					data = responseObject['job'];
				break;
				case "table-right":
					data = responseObject['school'];
				break;      
			}
			console.log(httpRequest.responseText);
			console.log(responseObject);
			console.log(data);
      		populate_div(leftright, data);
      
    	} else {
      		console.log("Unable to fetch URL: " + skills_url + ": " + httpRequest.status)
    	}
    }
	httpRequest.open('GET', skills_url, true);
	httpRequest.send();
}



function populate_div(leftright, data) {
     
  /* construct HTML/DOM objects here */   
  
  //var frag =document.createDocumentFragment(); // use fragment to avoid redraw
  var ul = document.createElement('ul');

  /* loop through the dataset */
  data.map(function iter_data(data_e) { 
    
    /* remember data_e is a value, scaler   */
    var li = document.createElement('li');
    li.innerText = data_e;
    ul.appendChild(li);

  });
  //frag.appendChild('ul')
  document.getElementById(leftright).appendChild(ul);
}
