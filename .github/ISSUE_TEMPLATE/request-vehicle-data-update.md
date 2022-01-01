---
name: Request Vehicle Data Update
about: Propose data updates for the app using the provided template.
title: ''
labels: data-update
assignees: tomgiddings

---

```javascript
/* 
 * Please use the following template to propose updates to data used in this app
 * 
 * For new entries: All fields are required
 * For updates: Please include make, model and version along with any updated values
 *
 */

{ 
    "WLTP": 0, // number: WLTP range in miles
    "battery": 0, // number: Battery capacity in kWh
    "chargingAC": {
        "method": "", // string: Either Type 1 or Type 2
        "powerRating": 0 // number: Charging speed in kW 
    },
    "chargingDC": {
        "method": "", // string: Either CHAdeMO, Combined Charging System (CCS), or Type 2 
        "powerRating": 0 // number: Charging speed in kW 
    },
    "make": "", // string: Make or manufacturer of the vehicle
    "model": "", // string: Model of the vehicle excluding trim level
    "version": "", // string: Version or trim level of the vehicle
    "pricing": {
        "OTR": 0 // number: Starting price On-The-Road in GBP 
    },
    "year": 0, // number: Year of first production/release, in form YYYY (eg. 2021)
    "images": [] // array of strings: URL for an image, please ensure this is able to be used legally
}
```
