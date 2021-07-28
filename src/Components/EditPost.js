import React from 'react'


const EditPost = () => {

    return (
        <div>
            <form>
                <label htmlFor="post"/>
                <textarea id="post" cols="30" rows="10"></textarea>
                <button>Picture</button>
                <button>Gif</button>
                <a href="/users" id="cancel-btn">Cancel</a>
                <button type="submit" value="update">Post</button>
            </form>
        </div>
    )
}

export default EditPost
