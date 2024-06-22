import { useState } from 'react'
import Main from './components/main'
import Footer from './components/footer'
import Sidebar from './components/sidebar'

function App() {

  const [showModal, setShowModal] = useState(false)

  function handleToggleModal() {
    setShowModal(!showModal)
  }

  return (
    <>
      <Main />
      { showModal && (<Sidebar handleToggleModal={handleToggleModal} />)}
      <Footer handleToggleModal={handleToggleModal}/>
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
to that component's main wrapping div and styling it through an individual css page.

inset: 0; means something will expand to the full width of its parent container.

Darkening the whole page inside of sidebar only affects <Main /> and doesn't darken the footer 
(even though the sidebar is fixed) because <Footer /> comes after everything in App.js. UNLESS
we give the sidebar a higher z-index.


First, we planned out the mobile version of the app by having the sidebar be inset and position: fixed, 
and have its contents take up 80% of the screen and margin-left: auto. When in a laptop or bigger screen,
we change the sidebar to being position relative (it snaps back into a flex box with the main picture), taking
the inset away, and having it have a width of 30%. With the contents, we margin: unset.

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
*/