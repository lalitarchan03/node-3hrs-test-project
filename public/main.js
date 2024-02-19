
const linkInput = document.getElementById('link');
const descInput = document.getElementById('disc');

const btn = document.querySelector('.btn');

const submitButton = document.getElementById('submit');
const id = document.getElementById('postId');


const form = document.getElementById('my-form');
form.addEventListener('submit', addPost);

// function to run on submitting the form
function addPost(e) {

    e.preventDefault();

    const link = e.target.link.value;
    const description = e.target.disc.value;

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
      <ul id="comments">
      <!-- Comments will be dynamically added here -->
      </ul>
    `;
    li.appendChild(commentForm);

    // Create a div to hold comments
    const commentsDiv = document.createElement('div');
    commentsDiv.classList.add('comments');
    li.appendChild(commentsDiv);

    // Hide the comment form initially
    commentForm.style.display = 'none';
    const postId = newPostDetail.id;
    // Show the comment form when the comment button is clicked
    commentButton.addEventListener('click', function() {
      commentForm.style.display = 'block';
      axios.get(`http://localhost:3000/comment/get-comments?id=${postId}`)
        .then((res) => {
            for (let i=0; i < res.data.allCommentDetail.length; i++) {
                // console.log('GET', res.data.allUserDetail[i]);
                // showComments(res.data.allCommentDetail[i]);
                const commentList = document.createElement('li');
                commentList.textContent = `Anonymous:- ${res.data.allCommentDetail[i].text}`;
                li.appendChild(commentList);
            }
        })
        .catch((err) => {
            console.log(err);
        })
      
    });
  
    // Handle the submission of comments
    commentForm.addEventListener('submit', async function(event) {
        event.preventDefault();
    
        const commentText = event.target.commentInp.value;;
        console.log(commentText, "inside comment post");
        
        const commentDetail = {
            commentText,
            postId
        };
        console.log(commentDetail);

        axios.post("http://localhost:3000/comment/add-comment", commentDetail)
        .then(res => {
            form.reset();
            console.log(res.data);
            // showComments(res.data.newCommentDetail)
            const commentList = document.createElement('li');
            commentList.textContent = `Anonymous:- ${res.data.newCommentDetail.text}`;
            li.appendChild(commentList);

        })
        .catch(err => {
            console.log(err)
        })

    });

    items.appendChild(li);

    
};

const getAllPosts = () => {
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
