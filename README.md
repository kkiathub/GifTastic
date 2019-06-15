# GifTastic

### Overview
This app is the showcase of using GIPHY API.  We are focusing on food gifs. Hope you are not hungry!  

### How to use.
1. A set of pre defined buttons are ready to use.  Click what you like.
2. Using text input to add more food items.
3. 10 Gifs will be displayed once you click any food button.
4. Note on the title , there is an emoji on each Gif.   By clicking on the title , the emoji will be toggle between neutral face and love face.
5. Love face means the gif that are attached to it is added to the favorite list.
6. If you click the gif with love emoji, the emoji will be switched back to the neutral face which means this gif is removed from the favorite list.
7. There are 10 items allowed in favorite list.  When the list reaches 10 items, the neutral emoji can not be changed until you remove some gifs off the list.
8. The favorite list is persisted even after you close the browser and reopen again.

### In the code...
    - On the UI, we use HTML, CSS, and Bootstrap.
    - JQuery is used to update elements.  
    - All logic are done in JavaScript.
    - Use localStorage to make favorite gifs persisted when reload the app or browser.
    - Use JSON to manage the favorite gifs (array of object) so it can be saved in/loaded from localStorage

### Potential update
    - Option to delete button.
    - Add additional gifs.
    