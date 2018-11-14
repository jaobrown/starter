// Global controller
import Search from './models/Search';
import * as searchView from './views/searchView';
import Recipe from './models/Recipe';
import { elements, renderLoader, clearLoader} from "./views/base";

/* Global state of the app
 - search object
 - Current recipe object
 - shopping list object
 - Liked recipes
*/

const state = {};

///////////////////////
// SEARCH CONTROLLER //
///////////////////////

const controlSearch = async () => {
    // 1) Get Query from view
    const query = searchView.getInput();

    if (query) {
        // 2) new search object and add to state
        state.search = new Search(query);
        // console.log(query);
        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // 4) Search for recipes
            await state.search.getResults();

            // 5) render results on UI
            // console.log(state.search.result);
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (err) {
            alert('Oh, no! Something is not cool with your search!');
        }
        clearLoader();
    }
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

///////////////////////
// RECIPE CONTROLLER //
///////////////////////

const controlRecipe = async () => {
    // get id from URL
    const id  = window.location.hash.replace('#', '');
    console.log(id);

    // check to see if there is id
    if (id) {
        // prepare ui for changes

        // create recipe object
        state.recipe= new Recipe(id);
        try {
            // get recipe data -- return result from promise generated in async function
            await state.recipe.getRecipe();
            // calc servings & time
            state.recipe.calcTime();
            state.recipe.calcServings();
            // render recipe
            console.log(state.recipe);
        } catch(err) {
            alert('Error with recipe!');
        }
    }
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));














