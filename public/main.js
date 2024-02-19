
// function generateUniqueId() {
//     return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
//   }

const linkInput = document.getElementById('link');
const descInput = document.getElementById('disc');

// const msg = document.getElementById('msg');
const btn = document.querySelector('.btn');
// const uuid = ('uuid');
const submitButton = document.getElementById('submit');
const id = document.getElementById('postId');


const form = document.getElementById('my-form');
form.addEventListener('submit', addPost);

// function to run on submitting the form
function addPost(e) {

    e.preventDefault();

    const link = e.target.link.value;
    const description = e.target.disc.value;
    // const category = e.target.categ.value;

    const postDetails = {
        link,
        description,
    };

    // console.log('frontend' ,postDetails);


    // adding data to database
    axios.post("http://localhost:3000/post/add-post", postDetails)
        .then(res => {
            form.reset();
            showDetailsOnScreen(res.data.newPostDetail)

        })
        .catch(err => {
            console.log(err)
        })
};

// showing data on screen 
function showDetailsOnScreen(newPostDetail) {
    
    console.log(newPostDetail.id);
    const items = document.getElementById('items');
    const li = document.createElement('li');
    li.textContent = `${newPostDetail.description} - `;
    
    // Create an img element
    const img = document.createElement('img');
    img.src = newPostDetail.link; // Set the src attribute to the link provided by the user
    img.alt = newPostDetail.description; // Set the alt attribute for accessibility
    
    // Append the img element to the li element
    li.appendChild(img);

    // Create a comment button
    const commentButton = document.createElement('button');
    commentButton.textContent = 'Comment';
    commentButton.classList.add('comment-button');
    li.appendChild(commentButton);

    // Create a comment form
    const commentForm = document.createElement('form');
    commentForm.classList.add('comment-form');
    commentForm.innerHTML = `
      <input type="text" id="commentInp" placeholder="Add your comment" required>
      <button type="submit">Post</button>
    `;
    li.appendChild(commentForm);

    // Create a div to hold comments
    const commentsDiv = document.createElement('div');
    commentsDiv.classList.add('comments');
    li.appendChild(commentsDiv);

    // Hide the comment form initially
    commentForm.style.display = 'none';

    // Show the comment form when the comment button is clicked
    commentButton.addEventListener('click', function() {
      commentForm.style.display = 'block';
      axios.get(`http://localhost:3000/comment/get-comments?id=${newPostDetail.id}`)
        .then((res) => {
            for (let i=0; i < res.data.allPostDetail.length; i++) {
                // console.log('GET', res.data.allUserDetail[i]);
                showDetailsOnScreen(res.data.allPostDetail[i]);
            }
        })
        .catch((err) => {
            console.log(err);
        })
      


    });

    // commentButton.addEventListener('click', function() {
    //     commentForm.style.display = 'block';
    //   });
  
    // Handle the submission of comments
    commentForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const commentInput = commentForm.querySelector('input[type="text"]');
    const commentText = commentInput.value;
    
      const commentDetail = {
        commentText
      };
      axios.post("http://localhost:3000/comment/add-comment", commentDetail)
        .then(res => {
            form.reset();
            showDetailsOnScreen(res.data.newPostDetail)

        })
        .catch(err => {
            console.log(err)
        })

    // Add the comment to the comments div
    // const commentParagraph = document.createElement('p');
    // commentParagraph.textContent = commentText;
    // commentsDiv.appendChild(commentParagraph);

    // Clear the comment input field
    commentInput.value = '';

    // You can make a POST request to your server here to save the comment data
    });

    // Append the li element to the list of items
    items.appendChild(li);

    
};


const getAllPosts = (req, res, next) => {
    axios.get("http://localhost:3000/post/get-posts")
        .then((res) => {
            for (let i=0; i < res.data.allPostDetail.length; i++) {
                // console.log('GET', res.data.allUserDetail[i]);
                showDetailsOnScreen(res.data.allPostDetail[i]);
            }
        })
        .catch((err) => {
            console.log(err);
        })
};
getAllPosts();
