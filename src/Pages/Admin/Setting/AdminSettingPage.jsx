import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';

import RichTextEditor from '../../../Rte/RichTextEditor';   //these line is for rich text editor
import { createStructuredContent } from '../../../Rte/richTextEditorBridge';   //these line is for rich text editor

import AdminSideBar from '../../../Components/Admin/AdminSideBar'

import { getSetting, createSetting, updateSetting } from '../../../Redux/ActionCreators/SettingActionCreator'

export default function AdminSettingPage() {

  //these line is for rich text editor
  let editorRefPrivacyPolicy = useRef(null)
  let editorRefTermsAndConditions = useRef(null)
  let editorRefRefundPolicy = useRef(null)

  //these line is for rich text editor
  let [privacyPolicy, setPrivacyPolicy] = useState("")
  let [termsAndConditions, setTermsAndConditions] = useState("")
  let [refundPolicy, setRefundPolicy] = useState("")

  let [data, setData] = useState({
    siteName: "",
    map1: "",
    map2: "",
    address: "",
    email: "",
    phone: "",
    whatsapp: "",
    facebook: "",
    twitter: "",
    instagram: "",
  })

  let SettingStateData = useSelector(state => state.SettingStateData)
  let dispatch = useDispatch()

  function getInputData(e) {
    let { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  function postData(e) {
    e.preventDefault()
    let item = {
      ...data,
      privacyPolicy: privacyPolicy,
      termsAndConditions: termsAndConditions,
      refundPolicy: refundPolicy
    }
    if (SettingStateData.length)
      dispatch(updateSetting({ ...item, id: SettingStateData[0].id }))
    else
      dispatch(createSetting({ ...item }))

    toast("Setting Data Has Been Updated!!!");
  }

  //these two function is for rich text editor
  function syncDocument(documentModel, nextHtml, option) {
    const resolvedHtml = nextHtml !== undefined ? nextHtml : renderHTML(documentModel);
    if (option === "privacyPolicy")
      setPrivacyPolicy(resolvedHtml)
    else if (option === "termsAndConditions")
      setTermsAndConditions(resolvedHtml)
    else
      setRefundPolicy(resolvedHtml)
  }

  //these two function is for rich text editor
  function handleChange(nextHtml, editor) {
    syncDocument(editor.getJSON(), nextHtml);
  }

  useEffect(() => {
    (() => {
      dispatch(getSetting())
      if (SettingStateData.length) {
        setData({ ...data, ...SettingStateData[0] })
        setTimeout(() => {
          syncDocument(createStructuredContent(""), SettingStateData[0].privacyPolicy ?? "", "privacyPolicy");
          syncDocument(createStructuredContent(""), SettingStateData[0].termsAndConditions ?? "", "termsAndConditions");
          syncDocument(createStructuredContent(""), SettingStateData[0].refundPolicy ?? "", "refundPolicy");
        }, 500)
      }
    })()
  }, [SettingStateData.length])

  return (
    <>
      <ToastContainer />

      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-lg-3">
            <AdminSideBar />
          </div>
          <div className="col-lg-9">
            <h5 className='p-2 text-light text-center bg-primary'>Setting</h5>
            <form onSubmit={postData}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>SiteName</label>
                  <input type="text" name="siteName" value={data.siteName} onChange={getInputData} className="form-control border-primary" placeholder="Site Name" />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Phone Number</label>
                  <input type="text" name="phone" value={data.phone} onChange={getInputData} className="form-control border-primary" placeholder="Phone" />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Email</label>
                  <input type="email" name="email" value={data.email} onChange={getInputData} className="form-control border-primary" placeholder="Email" />
                </div>
                <div className="col-md-6 mb-3">
                  <label>WhatsApp</label>
                  <input type="text" name="whatsapp" value={data.whatsapp} onChange={getInputData} className="form-control border-primary" placeholder="WhatsApp" />
                </div>
                <div className="col-12 mb-3">
                  <label>Address</label>
                  <input type="text" name="address" value={data.address} onChange={getInputData} className="form-control border-primary" placeholder="Address" />
                </div>
                <div className="col-12 mb-3">
                  <label>Map1</label>
                  <input type="text" name="map1" value={data.map1} onChange={getInputData} className="form-control border-primary" placeholder="Map 1" />
                </div>
                <div className="col-12 mb-3">
                  <label>Map2</label>
                  <input type="text" name="map2" value={data.map2} onChange={getInputData} className="form-control border-primary" placeholder="Map 2" />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Facebook Profile URL</label>
                  <input type="text" name="facebook" value={data.facebook} onChange={getInputData} className="form-control border-primary" placeholder="Facebook" />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Instagram Profile URL</label>
                  <input type="text" name="instagram" value={data.instagram} onChange={getInputData} className="form-control border-primary" placeholder="Instagram" />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Twitter Profile URL</label>
                  <input type="text" name="twitter" value={data.twitter} onChange={getInputData} className="form-control border-primary" placeholder="Twitter" />
                </div>

                <div className='col-12 mb-3'>
                  <label>Privacy Policy</label>
                  <RichTextEditor
                    ref={editorRefPrivacyPolicy}
                    className="editor-host border border-primary"
                    value={privacyPolicy}
                    onChange={(nextHtml, editor) => syncDocument(editor.getJSON(), nextHtml, "privacyPolicy")}
                    style={{ minHeight: 380 }}
                  />
                </div>

                <div className='col-12 mb-3'>
                  <label>Terms And Conditions</label>
                  <RichTextEditor
                    ref={editorRefTermsAndConditions}
                    className="editor-host border border-primary"
                    value={termsAndConditions}
                    onChange={(nextHtml, editor) => syncDocument(editor.getJSON(), nextHtml, "termsAndConditions")}
                    style={{ minHeight: 380 }}
                  />
                </div>

                <div className='col-12 mb-3'>
                  <label>Refund Policy</label>
                  <RichTextEditor
                    ref={editorRefRefundPolicy}
                    className="editor-host border border-primary"
                    value={refundPolicy}
                    onChange={(nextHtml, editor) => syncDocument(editor.getJSON(), nextHtml, "refundPolicy")}
                    style={{ minHeight: 380 }}
                  />
                </div>

                <div className="col-12 mb-3">
                  <button className="btn btn-primary w-100">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
