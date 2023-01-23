import * as React from 'react'
import { useState } from 'react'
import Geocode from 'react-geocode'

Geocode.setApiKey('AIzaSyAlFkElS2AMnkaZ3aox6g0r5l7SLadMFSk')

// set response language. Defaults to english.
Geocode.setLanguage('en')
Geocode.setLocationType('ROOFTOP')

// Enable or disable logs. Its optional.
Geocode.enableDebug()
const onclick = () => {
  Geocode.fromLatLng('-19.4656559', '29.8124125').then(
    (response) => {
      const address = response.results[0].formatted_address
      console.log(address)
    },
    (error) => {
      console.error(error)
    },
  )
  Geocode.fromAddress('1118 adelaide park gweru senga zimbabwe').then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location
      console.log(lat, lng)
    },
    (error) => {
      console.error(error)
    },
  )
}

function RouteMap() {
  return (
    //<button type='submit' onClick={onclick}></button>
    <section className="vh-100" style={{ backgroundColor: '#423a39' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card shadow-2-strong"
              style={{ borderRadius: '1rem' }}
            >
              <div className="card-body p-5 text-center">
                <h3 className="mb-5">Sign in</h3>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="typeEmailX-2"
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="typeEmailX-2">
                    Email
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="typePasswordX-2"
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="typePasswordX-2">
                    Password
                  </label>
                </div>

                <div className="form-check d-flex justify-content-start mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="form1Example3"
                  />
                  <label className="form-check-label" htmlFor="form1Example3">
                    {' '}
                    Remember password{' '}
                  </label>
                </div>

                <button
                  className="btn btn-primary btn-lg btn-block mybtn"
                  type="submit"
                >
                  Login
                </button>

                <hr className="my-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    // Get address from latitude & longitude.
  )
}

export default RouteMap
