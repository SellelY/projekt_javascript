
// G
// CODE According to specification
function click_filter_element (event) {

  const filter_dom = event.currentTarget;
  filter_dom.classList.toggle("selected");

  update_programmes();

  /*
    ARGUMENTS
      event: event-object created when user clicks on one of the filter elements.

    SIDE-EFFECTS
      Marks the clicked filter element as selected / unselected.
      Since a filter element will have changed after the click, the list of
      programmes must be updated.

      Attention VG
        Careful with the propagation of the click-event

    NO RETURN VALUE

  */
  
}


// G
// CODE according to specification
function create_filter_element (data) {

  let li = document.createElement("li");
  li.className = data.class;
  data.parent.appendChild(li);
  li.textContent = data.textContent;
  li.addEventListener("click", click_filter_element);
  return li;


  /*
    ARGUMENTS
      data: object that contains the following keys:
        class (string): a class-name given to the created element
        textContent (string): the text that the element contains
        parent (reference to HTML-element): the HTML-element that is the parent of the created element

      No control of arguments.

    SIDE-EFFECTS
      Creates a new dom-element with the tag "li".
      Gives the new dom-element the class contained in data.class
      Appends the new dom-element to the element referenced in data.parent
      Sets the text content of the new dom-element to data.textContent
      Sets the function click_filter_element as a listener to "click" for the new dom-element

    RETURN VALUE
      Returns a reference to the new dom-element
  */

}


// VG
// CODE according to specification
function add_group_toggling (filter_container_dom) {

  /*
    ARGUMENT
      filter_container_dom: reference to a HTML-element that contains a set of fliter_elements
            Exempel: the <ul> that contains the filters for Language.

    SIDE EFFECTS
      The function makes sure that when the user clicks on filter_container_dom, all the
      filter_elements that it contains are selected / unselected.
      Since some filter elements will have changed after the click, the list of
      programmes must be updated.

    NO RETURN VALUE

  */
  
}


// VG
// CODE according to specifications
function toggle_cities (event) {

  /*

    ARGUMENTS
      This function does not take any arguments

    SIDE EFFECTS
      This function checks the state of the first city-filter-element (Madrid).
      If it is selected then it de-selects ALL city-filter-elements
      If it is de-selected then it selects ALL city-filter-elements 

    NO RETURN VALUE

  */

}


// WRITE SPECIFICATION
// ATTENTION: You need to write the specification of all three functions:
//            create_countries_cities_filters, create_country and create_city
function create_countries_cities_filters () {

  /*
    ARGUMENT:
      Denna funktion tar inga argument.
    BIEFFEKTER:
      Den h??r funktionen skapar en lista ??ver country filter och city filter i DOM.
      Country filtren finns i ett "div"-element med klassen "country" och ID:t "country_<country.id>".
      City filtren finns i ett "ul"-element inom "div"-elementet f??r motsvarande land.
      City filtren skapas genom att anropa funktionen "create_city" f??r varje stad i arrayen "CITIES".
      Country filtren och city filtren l??ggs till i elementet "#country_filter > ul" i DOM.
    RETURV??RDE:
      Funktionen returnerar inget v??rde.
  */

  function create_country (country) {

    /*
      ARGUMENT:
        land: ett objekt som representerar ett land, med f??ljande nycklar:
          id: landets ID
          name : namnet p?? landet
 
      BIEFFEKTER:
        Denna funktion skapar ett country filter i DOM.
        country filtret ??r ett "div"-element med klassen "country" och ID:t "country_<country.id>".
        country filtret inneh??ller ett "h1"-element med textinneh??llet "country.name" och ett "u"`-element.
        Elementet "ul" anv??nds f??r att inneh??lla city filtren f??r detta land.
        country filtret l??ggs till i elementet "#country_filter > ul" i DOM.
 
      RETURV??RDE:
        Denna funktion returnerar inget v??rde.
    */

    const dom = document.createElement("div");
    dom.classList.add("country");
    dom.classList.add("filter_container");
    dom.id = "country_" + country.id;
    document.querySelector("#country_filter > ul").append(dom);
    
    dom.innerHTML = `
      <h1>${country.name}</h1>
      <ul class="filter_list"></ul>
    `;
    
    const cities = array_filter(CITIES, test_function);
    function test_function (city) {
      return city.countryID === country.id;
    }

    array_each(cities, create_city);
  }
  function create_city (city) {

    /*
      ARGUMENT:
        stad: ett objekt som representerar en stad, med f??ljande nycklar:
          id: stadens ID
          countryID: ID f??r det land som staden tillh??r
          name: namnet p?? staden
      BIEFFEKTER:
        Denna funktion skapar ett city filter i DOM.
        city filtret ??r ett "li"-element med klassen "selected" och data attribute "data-id" satt till "city.id".
        city filtret har textinneh??llet "city.name".
        city filtret l??ggs till "ul"-elementet inom "div"-elementet f??r motsvarande land (best??ms av "city.countryID").
      RETURV??RDE:
        Denna funktion returnerar inget v??rde.
    */

    const dom = create_filter_element({
      parent: document.querySelector(`#country_${city.countryID} > ul`),
      class: "selected",
      textContent: city.name,
    });
    dom.dataset.id = city.id;

  }

  array_each(COUNTRIES, create_country);
}


// G
// ABSTRACT AND WRITE SPECIFICATION
//    As you can see, all three functions below do basically the same thing.
//    Abstract them to one function, and write the specification of that function.
function create_levels_filter () {
  function create_level (level) {
    const dom = create_filter_element({
      parent: document.querySelector("#level_filter > ul"),
      class: "selected",
      textContent: level.name,
    });
    dom.dataset.id = level.id;
  }
  array_each(LEVELS, create_level);
}
// Create Subjects Filter
function create_subjects_filter () {
  function create_subject (subject) {
    const dom = create_filter_element({
      parent: document.querySelector("#subject_filter > ul"),
      class: "selected",
      textContent: subject.name,
    });
    dom.dataset.id = subject.id;
  }
  array_each(SUBJECTS, create_subject);
}
// Create Search Field
function create_language_filter () {
  function create_element (data) {
    const dom = create_filter_element({
      parent: document.querySelector("#language_filter > ul"),
      class: "selected",
      textContent: data.name,
    });
    dom.dataset.id = data.id;
  }
  array_each(LANGUAGES, create_element);
}

function create_filter(items, filter_type) {

  /*
    ARGUMENT:
      items: en array av objects, som vart och ett representerar ett item som ska filtreras, med f??ljande keys:
        id: items ID
        name: namnet p?? item
      filterType: en str??ng som representerar typen av filter som ska skapas (t.ex. "level", "subject", "language")

    BIEFFEKTER:
      Denna funktion skapar en lista med filterelement i DOM.
      Varje filterelement ??r ett "li" element med klassen "selected" och data attribute "data-id" inst??llt p?? motsvarande items ID.
      Filterelementet har textinneh??llet f??r motsvarande items namn.
      Filterelementen l??ggs till i elementet "#<filterType>_filter > ul" i DOM.

    RETURV??RDE:
      Denna funktion returnerar inget v??rde.
  */

  const filter_container = document.querySelector(`#${filter_type}_filter > ul`);

  items.forEach(item => {
    const filter_element = document.createElement("li");

    filter_element.classList.add("selected");

    filter_element.dataset.id = item.id;

    filter_element.textContent = item.name;

    filter_container.appendChild(filter_element);
  });
}


// G / VG (see details in specification)
// CODE according to specifications
function create_programme (programme) {

  const programme_element = document.createElement("div");

  programme_element.classList.add("programme");
  programme_element.innerHTML = `
  <div>
    <h3>${programme.name}</h3>
    <p>${UNIVERSITIES[programme.universityID].name}</p>
    <p>${CITIES[UNIVERSITIES[programme.universityID].cityID].name}, ${COUNTRIES[CITIES[UNIVERSITIES[programme.universityID].cityID].countryID].name}</p>
    <p>${UNIVERSITIES[programme.universityID].name}</p>
  </div>
  
  <div class="bottom_programme"> 
    <p>${CITIES[UNIVERSITIES[programme.universityID].cityID].name}, sun-index: ${CITIES[UNIVERSITIES[programme.universityID].cityID].sun}</p> 
  </div>
 `;

 document.querySelector("#programmes > ul").appendChild(programme_element);
  
  /*

    ARGUMENT
      programme (object): One of the objects from PROGRAMMES

    SIDE-EFFECTS
      This function creates the HTML-element that contains all the information
      about one programme, as seen in the video / image.
      
      VG: The background image is a random image from among the images of the city
          in which the programme is (via the university)
      G:  No background image required.


      VG: The "see more" interaction must be included.
      G:  The "see more" element is not required. And that information needs not be in place.

    NO RETURN VALUE

  */  

}


// G
// CODE according to the specification
function update_programmes () {

  const update_programmes_box = document.querySelector("#programmes > ul");
  update_programmes_box.innerHTML = ``;

  let programmes = read_filters();
  if(programmes.length !== 0) {
    let text = document.querySelector("#programmes > p");
    text.innerHTML = ``;
  } else {
    let text = document.querySelector("#programmes > p");
    text.innerHTML = `Inga program uppfyller nuvarande filter.`;
  }
  array_each(programmes, create_programme);

  /*
      NO ARGUMENTS

      SIDE EFFECTS
        This function updates the programmes shown on the page according to
        the current filter status (which filter elements are selected / unselected).
        It uses the function read_filters to know which programmes need to be included.

        VG: The top images (header) need to be updated here

      NO RETURN VALUE

  */

}


// G
// WRITE SPECIFICATION
// You must understand how this function works. There will be questions about it
// in the code review (kodredovisning)

// Optional VG: Which parts of the function's code could be abstracted?
//              Implement it
function read_filters () {

  /*
ARGUMENT:
      Denna funktion tar inga argument.

    BIEFFEKTER:

      Den h??r funktionen l??ser det aktuella tillst??ndet f??r filterelementen i DOM och returnerar en array av program som ska visas baserat p?? de valda filtren.
      Specifikt g??r den f??ljande:
      1. L??ser de valda city filter elements och f??r deras ID.
      2. Hittar universities i dessa cities och f??r deras ID.
      3. Hittar de program som erbjuds av dessa universities och lagrar dem i en array.
      4. L??ser de valda selected level filter elements och f??r deras ID.
      5. Filtrerar programmes s?? att den endast inkluderar program med ett level ID som ing??r i de valda level ID.
      6. L??ser de valda language filter elements och f??r deras ID.
      7. Filtrerar programmes array s?? att den endast inkluderar program med ett language ID som ing??r i de valda language ID.
      8. L??ser de valda subject filter elements och f??r deras ID.
      9. Filtrerar programmes array s?? att den endast inkluderar program med ett subject ID som ing??r i de valda subject ID.
      10. L??ser v??rdet(value) p?? s??kf??ltet och filtrerar programmes array s?? att den bara inkluderar program med ett namn som inneh??ller search string (s??kstr??ngen).

    RETURV??RDE:
      Den h??r funktionen returnerar en upps??ttning program som ska visas baserat p?? de valda filtren.
*/
  
  const city_selected_dom = document.querySelectorAll("#country_filter li.selected");

  const city_id_selected = [];
  function callback_add_cityID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    city_id_selected.push(id_as_integer);
  }
  array_each(city_selected_dom, callback_add_cityID);

  const universities = [];
  for (let i = 0; i < city_id_selected.length; i++) {
    const city_id = city_id_selected[i];
    for (let ii = 0; ii < UNIVERSITIES.length; ii++) {
      const university = UNIVERSITIES[ii];
      if (university.cityID === city_id) {
        universities.push(university);
      }
    }
  }

  let programmes = [];
  function callback_add_programmes (university) {
    const university_id = university.id;
    for (let i = 0; i < PROGRAMMES.length; i++) {
      const programme = PROGRAMMES[i];
      if (programme.universityID === university_id) {
        programmes.push(programme);
      }
    }
  }
  array_each(universities, callback_add_programmes);



  const level_selected_dom = document.querySelectorAll("#level_filter li.selected");
  const level_id_selected = [];
  function callback_add_levelID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    level_id_selected.push(id_as_integer);
  }
  array_each(level_selected_dom, callback_add_levelID);

  function test_function_level (programme) {
    return level_id_selected.includes(programme.levelID);
  }
  programmes = array_filter(programmes, test_function_level);



  const language_selected_dom = document.querySelectorAll("#language_filter li.selected");
  const language_id_selected = [];
  function callback_add_languageID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    language_id_selected.push(id_as_integer);
  }
  array_each(language_selected_dom, callback_add_languageID);



  function test_function_language (programme) {
    return language_id_selected.includes(programme.languageID);
  }
  programmes = array_filter(programmes, test_function_language);



  const subject_selected_dom = document.querySelectorAll("#subject_filter li.selected");
  const subject_id_selected = [];
  function callback_add_subjectID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    subject_id_selected.push(id_as_integer);
  }
  array_each(subject_selected_dom, callback_add_subjectID);



  function test_function_subject (programme) {
    return subject_id_selected.includes(programme.subjectID);
  }
  programmes = array_filter(programmes, test_function_subject);



  const search_string = document.querySelector("#search_field input").value;
  if (search_string !== "") {
    function test_function (programme) {
      return programme.name.includes(search_string);
    }
    programmes = array_filter(programmes, test_function);
  }

  return programmes;
}
