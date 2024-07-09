import React, { useState, useEffect } from "react";
import { foods } from "../constants/foods";
import { toys } from "../constants/toys";
import { activities } from "../constants/activities";
import { equipments } from "../constants/equipments";
import { locations } from "../constants/locations";

import { ReactComponent as Chicken } from "../Chicken.svg";
import "./Pet.css";

const initialPetState = {
  name: "Dino",
  type: "Dinosaur",
  age: 0,
  equipped: {
    head: null,
    body: null,
    neck: null,
    feet: null,
  },
  inventory: {

  },

  sick: true,
  disease: "",

  energy: 0,
  hunger: 0,
  health: 100,

  happiness: 0,
  love: 0,

  intelligence: 0,
  strength: 0,
};

export default function Pet() {
  const [pet, setPet] = useState(initialPetState);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPetDead, setIsPetDead] = useState(false);

  useEffect(() => {
    const propertyCheckInterval = setInterval(() => {
      if (isPetDead) return;
      // Extract the specific properties to check
      const { hunger, health, energy, happiness } = pet;
  
      // Check if any of the specific properties is <= 0
      const anyZeroOrNegative = [hunger, health, energy, happiness].some(value => value <= 0);
  
      if (anyZeroOrNegative) {
        // Increment elapsed time if any property is zero or negative
        setElapsedTime(prevTime => prevTime + 600); // 600 milliseconds = 1 minute
      } else {
        // Reset elapsed time if all properties are positive
        setElapsedTime(0);
      }
  
      // Declare pet dead if elapsed time reaches 3 minutes
      if (elapsedTime >= 1800 && !isPetDead) {
        setIsPetDead(true);
        clearInterval(propertyCheckInterval); // Stop checking once pet is declared dead
      }
    }, 600); // Check every minute
  
    return () => clearInterval(propertyCheckInterval);
  }, [pet, elapsedTime, isPetDead]);
  
  useEffect(() => {
    if (isPetDead) return;
    const ageIncrementInterval = setInterval(() => {
      updatePetState({
        age: pet.age + 1
      });
    }, 60000); // 60000 milliseconds = 1 minute
    return () => clearInterval(ageIncrementInterval);
  }, [pet.age, isPetDead]);

  useEffect(() => {
    if (isPetDead) return;
    const healthDecrementInterval = setInterval(() => {
      setPet(prevPet => {
        if (prevPet.sick && prevPet.health > 0) {
          return { ...prevPet, health: prevPet.health - 1 };
        } else {
          return prevPet; // No state update if not sick or health <= 0
        }
      });
    }, 6000); // 60000 milliseconds = 1 minute
  
    return () => clearInterval(healthDecrementInterval);
  }, [pet.sick, isPetDead]);

  useEffect(() => {
    if (isPetDead) return;
    const hungerDecrementInterval = setInterval(() => {
        updatePetState({
            hunger: pet.hunger - 1
          });
    }, 6000); // 60000 milliseconds = 1 minute
  
    return () => clearInterval(hungerDecrementInterval);
  }, [pet.hunger, isPetDead]); 
  


  const updatePetState = (statUpdates) => {
    setPet(prevPet => ({
      ...prevPet,
      ...statUpdates
    }));
  };

  const feedPet = (food) => {
    const foodStats = foods[food];
    if (foodStats) {
      updatePetState({
        hunger: pet.hunger + foodStats.hunger,

        age: pet.age + (foodStats.ageIncrement || 0),

        energy: pet.energy + (foodStats.energy || 0),
        health: pet.health + (foodStats.health || 0),
    
        //happiness: pet.happiness + (foodStats.happiness || 0),
        //love: pet.love + (foodStats.love || 0),

        intelligence: pet.intelligence + (foodStats.intelligence || 0),
        strength: pet.strength + (foodStats.strength || 0),
      });
    }
  };

  const playWithPet = (toy) => {
    const toyStats = toys[toy];
    if (toyStats) {
      updatePetState({
        happiness: pet.happiness + toyStats.happiness,
        //love: pet.love + toyStats.love,
        energy: pet.energy + toyStats.energy,

        hunger: pet.hunger + (toyStats.hunger || 0),
        health: pet.health + (toyStats.health || 0),

        intelligence: pet.intelligence + (toyStats.intelligence || 0),
        strength: pet.strength + (toyStats.strength || 0),
      });
    }
  };

  const sleepPet = (time) => {
    updatePetState({
      energy: pet.energy + time,
      health: pet.health + time,
    });
  };

  const trainPet = (equipment, activity) => {
    const activityStats = activities[activity];
    const equipmentStats = equipment ? equipments[equipment] : {};
    console.log(activityStats, equipmentStats)
    if(typeof activityStats === 'function') {
      const stats = activityStats();
      updatePetState({
        strength: pet.strength + (stats.strength*(equipmentStats.strength || 1) || 0),
        intelligence: pet.intelligence + (stats.intelligence*(equipmentStats.intelligence || 1) || 0),

        energy: pet.energy + (stats.energy*(equipmentStats.energy || 1) || 0),
        hunger: pet.hunger + (stats.hunger*(equipmentStats.hunger || 1) || 0),
        health: pet.health + (stats.health*(equipmentStats.health || 1) || 0),

        //happiness: pet.happiness + (activityStats.happiness*(equipmentStats.happiness || 1) || 0),
        //love: pet.love + (activityStats.love*(equipmentStats.love || 1) || 0),
      });
    }
    else {
      updatePetState({
        strength: pet.strength + (activityStats.strength || 0),
        intelligence: pet.intelligence + (activityStats.intelligence || 0),

        energy: pet.energy + (activityStats.energy || 0),
        hunger: pet.hunger + (activityStats.hunger || 0),
        health: pet.health + (activityStats.health || 0),
      });
    }
  }
  

  const curePet = (medicine) => {
    /*
        const medicineStats = medicines[medicine];
        if(medicineStats && medicineStats.disease === pet.disease){ {
            updatePetState({
                health: pet.health + medicineStats.health
                sick: false
            });
        }
    */


    updatePetState({
    sick: false
    });
  };

  const quest = (quest) => {
  }

  const explore = (target) => {
    const locationStats = locations[target];
    if (typeof locationStats === 'function') {
      const stats = locationStats();
      
      const updatedInventory = {};
  
      for (let key in pet.inventory) {
        if (stats.rewards.hasOwnProperty(key)) {
          updatedInventory[key] = pet.inventory[key] + stats.rewards[key];
        } else {
          updatedInventory[key] = pet.inventory[key];
        }
      }
  
      for (let key in stats.rewards) {
        if (!updatedInventory.hasOwnProperty(key)) {
          updatedInventory[key] = stats.rewards[key];
        }
      }
  
      updatePetState({
        energy: pet.energy + (stats.energy || 0),
        inventory: updatedInventory
      });
    }
    console.log(pet.inventory);
  }
  const garden = (target, equipment, materials) => {
    
  }

  const craft = (target, materials) => {
  }

  return (
    <div>
      <h2>{pet.name}</h2>
      <p>Type: {pet.type}</p>
      <p>Age: {pet.age}</p>
    <p>Dead?: {isPetDead ? "Yes" : "No"}</p>
    <p>Elapsed Time: {elapsedTime}</p>
      <p>Hunger: {pet.hunger}</p>
      <p>Health: {pet.health}</p>
      <p>Sick: {pet.sick ? "Yes" : "No"}</p>
      {pet.sick && <p>Disease: {pet.disease}</p>}
      <p>Happiness: {pet.happiness}</p>
      <p>Love: {pet.love}</p>
      <p>Energy: {pet.energy}</p>
      <p>Intelligence: {pet.intelligence}</p>
      <p>Strength: {pet.strength}</p>
      <h3>Inventory:</h3>
      <ul>
        {Object.keys(pet.inventory).map((item, index) => (
          <li key={index}>{item}: {pet.inventory[item]}</li>
        ))}
      </ul>

      <h3>Equipped:</h3>
      <ul>
        {Object.keys(pet.equipped).map((slot, index) => (
          <li key={index}>{slot}: {pet.equipped[slot]}</li>
        ))}
      </ul>

      <Chicken className="chicken-svg" > </Chicken>

      <button onClick={() => feedPet("meat")}>Feed</button>
      <button onClick={() => trainPet("","climbing")}>Train Climbing</button>
      <button onClick={() => sleepPet(5)}>Sleep Pet</button>
      <button onClick={() => playWithPet("ball")}>Play With Toy</button>
      <button onClick={() => curePet("cure")}>Cure</button>
      <button onClick={() => explore("beach")}>Explore</button>



      {/* Render other pet attributes as needed */}
    </div>
  );
}
