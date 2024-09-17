import "./style.scss"
import { useContext, useEffect } from "react"
import { context } from "../../store"


function Profile(props) {
    const state = useContext(context)
    // {
    //   "user": {
    //       "id": 1,
    //       "username": "admin",
    //       "email": "",
    //       "first_name": "",
    //       "last_name": ""
    //   },
    //   "image": "http://127.0.0.1:8000/media/profile_pics/default.png",
    //   "bio": null
    // }

    return (
        <div className="profile-page-wrapper">
            <h1>{state.currentUser?.user?.username.toUpperCase()} Profile</h1>
            
            <img src={state.currentUser?.image} alt="" />

            { state.currentUser.user?.first_name?.length > 0 &&
                <p>
                    <b>First name: </b> {state.currentUser.user.first_name}
                </p>
            }
            { state.currentUser.user?.last_name?.length > 0 &&
                <p>
                    <b>Last name: </b> {state.currentUser.user.last_name}
                </p>
            }
            { state.currentUser.user?.email?.length > 0 &&
                <p>
                    <b>Email: </b> {state.currentUser.user.email}
                </p>
            }
            { state.currentUser?.bio?.length > 0 &&
                <p>
                    <b>Bio: </b> {state.currentUser.bio}
                </p>
            }
        </div>
    )
}

export default Profile