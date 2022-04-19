import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import axios from 'axios'

// image
import phd from '../imgs/phd.jpg'

// components
import Pfp from './Pfp'
import ProfileModal from './ProfileModal'
import CollectionModal from './CollectionModal'

const PLACE_HOLDER = 'https://cdn.vox-cdn.com/thumbor/qDV-Av0h_Qf1u6MUJ9L_D7uLM-w=/0x0:1200x800/1200x800/filters:focal(428x63:620x255)/cdn.vox-cdn.com/uploads/chorus_image/image/66160336/image__13_.0.png'

const MyProfile = () => {
  const [user, setUser] = useState('')
  const [myPfp, setMyPfp] = useState(phd)
  const [myAbout, setMyAbout] = useState('')
  const [myCollection, setMyCollection] = useState([])
  const [currImg, setCurrImg] = useState('')

  const [scrollWidth, setScrollWidth] = useState(0)
  const carousel = useRef()

  const [infoModalVisible, setInfoModalVisible] = useState(false)

  const [collectionModalVisible, setCollectionModalVisible] = useState(false)

  useEffect(() => {
    const getProfileInfo = async () => {
      const { data } = (await axios.get('/api/profile/get_data'))
      const {
        username, pfp, about, collections,
      } = data
      if (!pfp) {
        setMyPfp(phd)
      } else {
        setMyPfp(pfp)
      }
      setUser(username)
      setMyAbout(about)
      console.log(collections)
      if (collections) {
        setMyCollection(collections)
      }
    }

    getProfileInfo()
  }, [infoModalVisible, collectionModalVisible])

  useEffect(() => {
    setScrollWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
  }, [myCollection])

  const InfoModal = () => {
    if (infoModalVisible) {
      if (myPfp === phd) {
        return <ProfileModal setModalVisible={setInfoModalVisible} oldImage="" oldAbout={myAbout} />
      }
      return <ProfileModal setModalVisible={setInfoModalVisible} oldImage={myPfp} oldAbout={myAbout} />
    }
    return <></>
  }

  const addPlaceHolderArt = async () => {
    await axios.post('api/profile/add_collection', { newImg: PLACE_HOLDER })
      .catch(error => {
        alert(`${error.response.data}`)
      })

    setMyCollection([...myCollection, PLACE_HOLDER])
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

      <div className="mx-10 mt-5 flex justify-center ">
        <motion.div ref={carousel} className="carousel cursor-grab overflow-hidden">
          <motion.div drag="x" dragConstraints={{ right: 0, left: -scrollWidth }} className="inner-carousel flex">
            {myCollection.map((img, index) => (
              <motion.div className="item min-h-[25rem] h-[25rem] min-w-[35rem] w-[35rem] p-5" key={index}>
                <button onClick={e => artWorkClicked(img)} type="button">
                  <img src={img} alt="" className="h-full w-full object-cover rounded-sm" />
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
