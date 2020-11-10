export default {
  addCoachToList(state, payload) {
    state.coaches.push(payload);
    //Volgens mijn kan deze methode weg
  },
  setIsRegistered(state, payload) {
    state.isRegistered = payload;
  },
  setCoaches(state, payload){
    payload.forEach(p => {
      state.coaches.push(p)
    })
  }

  //zo had die vent hem.
  // maar dna laad hij alleen degene uit de firebase database in, klopt
  //dus ik dacht ik voeg de payload toe aan de coaches list
};
