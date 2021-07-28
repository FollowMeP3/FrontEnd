import React from 'react'


const MainFeed = () => {
    return (
        <div>
            {/* will have to map through this data once import seed data */}
            <h1>Feed</h1>
            <div className="user-info">
                <img src="" alt="" className="profile-pic"/>
                <p>timestamp</p>
            </div>
            <div className="post-content">
                <p>someone else's activity here</p>
                <img src="" alt=""/>
                <a href="">see more</a>
                <ul className="interactions">
                    <button>like</button>
                    <button>comment</button>
                </ul>
            </div>
        </div>
    )
}

export default MainFeed
