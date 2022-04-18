import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'

// image
import phd from '../imgs/phd.jpg'

import Pfp from './Pfp'
import ProfileModal from './ProfileModal'

const MyProfile = () => {
  const [user, setUser] = useState('')
  const [myPfp, setMyPfp] = useState(phd)
  const [myAbout, setMyAbout] = useState('')
  const [myCollection, setMyCollection] = useState([])

  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    const getProfileInfo = async () => {
      const { data } = (await axios.get('/api/profile/get_data'))
      const {
        username, pfp, about, collection,
      } = data
      if (!pfp) {
        setMyPfp(phd)
      } else {
        setMyPfp(pfp)
      }
      setUser(username)
      setMyAbout(about)
      setMyCollection(collection)
    }

    const getCollections = async () => {
      const { data } = (await axios.post('/api/profile/get_collections'), { user })
      const {
        collection,
      } = data
      setMyCollection(collection)
    }

    getProfileInfo()
  }, [modalVisible])

  // Pop-up modal used for adding new questions
  const Modal = () => {
    if (modalVisible) {
      if (myPfp === phd) {
        return <ProfileModal setModalVisible={setModalVisible} oldImage="" oldAbout={myAbout} />
      }
      return <ProfileModal setModalVisible={setModalVisible} oldImage={myPfp} oldAbout={myAbout} />
    }
    return <></>
  }

  return (
    <>
      <Link to="/">
        <div className="mt-10 ml-14 text-5xl font-mono">
          &lt;
        </div>
      </Link>

      <Modal />

      <div className="mx-10 flex flex-col justify-center items-center mt-10">
        <button onClick={e => setModalVisible(true)} type="button">
          <Pfp loggedIn pfp={myPfp} />
        </button>
        <div className="p-5 w-1/3 text-center border-b-2 border-black font-mono text-2xl">
          {user}
        </div>
        <button onClick={e => setModalVisible(true)} type="button" className="p-5 pb-12 w-full text-center border-b-2 border-black sfont-bold font-mono text-2xl">
          {myAbout}
        </button>
      </div>

      <div className="m-10 mt-5 h-full flex justify-center ">
        <div className="">
          Collections
        </div> 
      </div>
    </>
  )
}

export default MyProfile
