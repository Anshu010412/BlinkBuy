import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getSetting } from '../../Redux/ActionCreators/SettingActionCreator'

import BreadCrum from '../../Components/BreadCrum'

export default function RefundPolicy() {
  let [settingData, setSettingData] = useState({
    refundPolicy: "",
  })

  let SettingStateData = useSelector(state => state.SettingStateData)         //for retrieve data from redux store.
  let dispatch = useDispatch();

  useEffect(() => {
    (() => {
      dispatch(getSetting())
      let item = {}
      if (SettingStateData.length) {
        Object.keys(settingData).forEach(key => {
          item[key] = SettingStateData[0][key] ? SettingStateData[0][key] : settingData[key]
        })
        setSettingData({ ...item })
      }
    })()
  }, [SettingStateData.length])

  return (
    <>
      <BreadCrum title="Refund-Policy" />
      <div className="container-fluid my-3">
        <div dangerouslySetInnerHTML={{ __html: settingData.refundPolicy }} />
      </div >
    </>
  )
}
