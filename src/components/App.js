import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }


  onChangeType = (event) => {
    this.setState({filters: {type: event.target.value}})
  }

  onFindPetsClick = () => {
    if (this.state.filters.type === "all") {
      fetch(`/api/pets`)
      .then(res => res.json())
      .then(allPets => this.setState({pets: allPets}))
    } else {
      fetch(`/api/pets?type=${this.state.filters.type}`)
      .then(res => res.json())
      .then(animalType => this.setState({pets: animalType}))
    }
  }

  onAdoptPet = (petId) => {
    let match =  this.state.pets.map( (pet) => {
      if (pet.id === petId){
          pet.isAdopted = true
          return pet
      } else {
        return pet
      }
    })
    this.setState({
      pets: match
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType = {this.onChangeType} onFindPetsClick = {this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet = {this.onAdoptPet} pets={this.state.pets}/>
              
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
