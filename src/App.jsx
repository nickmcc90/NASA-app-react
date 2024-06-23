import { useState, useEffect } from 'react'
import Main from './components/main'
import Footer from './components/footer'
import Sidebar from './components/sidebar'
import './styles/app.css'

function App() {


  const [data, setData] = useState(null) // this will be filled with a data request upon loading the page.
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  function handleToggleModal() {
    setShowModal(!showModal)
  }

  useEffect(() => {
    async function fetchAPIData() {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
      const url = 'https://api.nasa.gov/planetary/apod' +
      `?api_key=${NASA_KEY}`


      //cache data clause
      const today = (new Date()).toDateString();  // this grabs todays date.
      const localKey = `NASA-${today}`;       // this turns today's date into a key
      if(localStorage.getItem(localKey)) {    // if this key exists in our local storage (if it does then we've already put data inside it, we don't want to access the API twice for the same thing)...
        const apiData = JSON.parse(localStorage.getItem(localKey))    // we can access the data from the key and..
        setData(apiData)        // have our data that way. This process caches data from each date that the page is loaded.
        console.log("Grabbed from cache today");
        console.log(today);
        return
      }
      // if we make it here in the code, then data hasn't been accessed today, so we clear the storage

      localStorage.clear()  // this clears out past dates that won't be used anymore


      try {
        const res = await fetch(url)
        const apiData = await res.json()
        localStorage.setItem(localKey, JSON.stringify(apiData))
        setData(apiData)
        console.log("Grabbed from API today");
      } catch(err) {
        console.log(err.message);
      }
    }

    fetchAPIData();
  }, [])

  return (
    <>
      {/* If the data has been retrieved (is true) the NASA picture will load in the back */}
      {data ? (<Main data={data}/>): (
        <div className='loading-state'>
          <i className="fa-solid fa-gear"></i>
        </div>
      )}
      { showModal && (<Sidebar handleToggleModal={handleToggleModal} data={data}/>)}
      {data && (<Footer handleToggleModal={handleToggleModal} data={data} />)}
    </>
  )
}

export default App


/* 
This is the beginning of the app. 

Timestamp: 54:08.

In index.css, the * symbol selects everything. We can set the padding and margin to 0 to have everything flush
with the borders on the screen. Box-sizing ensures that the width and height of everything on the page incorporates
the padding and borders to the height.

For example, a height of 100px without box-sizing would end up being higher because it would be 100+padding+border.
With box-sizing, the height of 100px would be height+padding+border = 100px;


Adding a display flex and flex-direction: column to the picture makes it more responsive when we resize the page.

It seems like styling an entire component through going to index.css and using the tag name is quicker than going
to that component's main wrapping div and styling it through an individual css page. This didn't work for me though.

inset: 0; means something will expand to the full width of its parent container.

Darkening the whole page inside of sidebar only affects <Main /> and doesn't darken the footer 
(even though the sidebar is fixed) because <Footer /> comes after everything in App.js. UNLESS
we give the sidebar a higher z-index.


First, we planned out the mobile version of the app by having the sidebar be inset and position: fixed, 
and have its contents take up 80% of the screen and margin-left: auto. When in a laptop or bigger screen,
we change the sidebar to being position relative (it snaps back into a flex box with the main picture), taking
the inset away, and having it have a width of 30%. With the contents, we margin: unset and have the max-width
of the contents be 100%.

Now we have to make the page such that the sidebar is conditionally displayed. My inital idea is to
have the button access a media query? A button that toggles a styling class on the sidebar. This might
be with onClick={() => {classList.add}} or something.


You are able to conditionally render elements with a useState variable and a conditional operator inside
App.js! Wrap the element you want to conditionally appear in parenthesis and curly brackets.

Instead of writing: 
  { showModal ? <Sidebar /> : null}

We can just write:
  { showModal && (<Sidebar />)}

And to toggle this state, we write code for the button!

--Sidenote:
This is the logic for the entire page so far.
1. Have #root be relative and a flex horizontal.
2. Realize the strategy of having a picture, footer, and sidebar component.
3. Have the picture component reside inside the root flex box as 100% width and height.
4. Have the footer and sidebar component be in the root flex box too, but be position: fixed so that the
picture takes up the whole page. (And so that upon window resizing the sidebar can fall back into the flex
box with a media query changing its position to relative)
5. Tailor the footer to the bottom and have it be a flex box to separate its info button to the right
of the screen. Have a div with a linear gradient styling be in the footer component with a z-index
of -1 such that it is behind everything. **Tip**, setting the lin. grad. div to pos: abs and inset: 0
sets the gradient to be in the back taking up the whole width.
6. Tailor the sidebar with a div for overlay and a div for contents. Have the overlay be z-index 10 such
that it covers the whole page regardless of where the sidebar component is in App.js relative to footer.
The overlay darkens the screen a little. The contents are z-indexed higher to be over the overlay. 
Margin-left: auto brings the stuff to the right and some padding, height, width, and flex-direction column
makes the content responsive.
7. Media query the sidebar to be positive relative when the page is bigger than 640px, also to remove any
insets and margins from the sidebar and its contents.
8. Once happy with this, create a state variable that can conditionally render the sidebar on the screen. We
will attach this to a button.



Weird thing: I don't know how to get the i button to disappear after hitting it with a large screen.
The footer is fixed, and when the modal pops up in a large screen it is relative. Hmmmmm. I don't
think James the Youtuber saw how the button operated in full screen.

Timestamp: 1:24:00

We created a .env file to store our API KEY in a variable that we access in App.js with that typa syntax.


We fetch data from APIs in react using useEffect.

We set the fetched data to a state variable, and make the components in the app conditionally render
based on if the data is true or not (has been fetched)

If the data is not retrieved, then instead of Main we can have a div that displays a turning cog wheel.
Look to app.css for the animation syntax.

We can pass the api data into the sidebar and the footer now!

I accidentally ran up all my API calls for the NASA API because I didn't add a dependency array to the
useEffect function haha! Now I need to wait an hour to see the data show up, but I believe it works.

All we did in the tutorial was do a little bit more styling. Now it is time to cache the information.

Caching information serves the purpose of only needing to call the API when necessary. If you've never
called the API before, calling it for the first time is needed. If you keep refreshing the page, then
you will keep calling the API, which we don't want. We want to store the information gathered by the API
on the first time that we call it, so that if we refresh the page we can grab the information from
localStorage. To figure out if we've already called the API before, we can start by assigning a localKey to the api
call data in the form of today's date. There is new information available everyday, so one call to the API
per day is necessary.

At every page reload, we store today's date in a key, then see if that key exists in localStorage. If it does,
then we grab data from localstorage with const ddd = JSON.parse(localStorage.getItem(localKey)). 

If we've never called the API today (the key doesn't exist), we first do a localStorage.clear()
Then, we grab info from the API, then before setting the api data inside of
the state variable, we setItem the api data into the key we created at the beginning of the page reload.
This ensures that there is a key with today's date that has the info we need. 
*/