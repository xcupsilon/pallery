import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import axios from 'axios'

// image
import phd from '../imgs/phd.jpg'

// components
import Pfp from './Pfp'
import ProfileModal from './ProfileModal'
import CollectionModal from './CollectionModal'

const MyProfile = () => {
  const [user, setUser] = useState('')
  const [myPfp, setMyPfp] = useState(phd)
  const [myAbout, setMyAbout] = useState('')
  const [myCollection, setMyCollection] = useState([])
  const [currImg, setCurrImg] = useState('')

  const [infoModalVisible, setInfoModalVisible] = useState(false)

  const [collectionModalVisible, setCollectionModalVisible] = useState(false)

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
      if (collection) {
        setMyCollection(collection)
      }
    }

    getProfileInfo()
  }, [infoModalVisible, collectionModalVisible])

  const InfoModal = () => {
    if (infoModalVisible) {
      if (myPfp === phd) {
        return <ProfileModal setModalVisible={setInfoModalVisible} oldImage="" oldAbout={myAbout} />
      }
      return <ProfileModal setModalVisible={setInfoModalVisible} oldImage={myPfp} oldAbout={myAbout} />
    }
    return <></>
  }

  const addPlaceHolderArt = () => {
    setMyCollection([...myCollection, 'https://cdn.vox-cdn.com/thumbor/qDV-Av0h_Qf1u6MUJ9L_D7uLM-w=/0x0:1200x800/1200x800/filters:focal(428x63:620x255)/cdn.vox-cdn.com/uploads/chorus_image/image/66160336/image__13_.0.png'])
  }

  const AddArtButton = () => (
    <div className="flex justify-center">
      <button onClick={e => addPlaceHolderArt()} type="button" className="text-6xl">
        +
      </button>
    </div>
  )

  const artWorkClicked = img => {
    setCurrImg(img)
    setCollectionModalVisible(true)
  }

  return (
    <>
      <Link to="/">
        <div className="mt-10 ml-14 text-5xl font-mono">
          &lt;
        </div>
      </Link>

      <InfoModal />

      <div className="mx-10 flex flex-col justify-center items-center mt-10">
        <button onClick={e => setInfoModalVisible(true)} type="button">
          <Pfp loggedIn pfp={myPfp} />
        </button>
        <div className="p-5 w-1/3 text-center border-b-2 border-black font-mono text-2xl">
          {user}
        </div>
        <button onClick={e => setInfoModalVisible(true)} type="button" className="p-5 pb-12 w-full text-center border-b-2 border-black sfont-bold font-mono text-2xl">
          {myAbout}
        </button>
      </div>

      <div className="m-10 mt-5 flex justify-center ">
        <motion.div className="carousel bg-gray-200">
          <motion.div className="inner-carousel">
            {myCollection.map((img, index) => (
              <motion.div className="item h-[25rem] w-[35rem]" key={index}>
                <button onClick={e => artWorkClicked(img)} type="button">
                  <img src={img} alt="" className="h-[25rem] w-[35rem] object-cover" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      { collectionModalVisible
        && <CollectionModal setModalVisible={setCollectionModalVisible} oldImage={currImg} />}

      <AddArtButton />
    </>
  )
}

export default MyProfile
