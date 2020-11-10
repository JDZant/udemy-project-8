import _default from "vuex";

export default {
  async addCoach(context, payload) {
    const userId = context.rootGetters.getUserId;
    const updatedPayload = {
      firstName: payload.first.value,
      lastName: payload.last.value,
      description: payload.desc.value,
      hourlyRate: payload.rate.value,
      areas: payload.areas.value,
    };

    const response = await fetch(
      `https://vue-http-demo-dd2b3.firebaseio.com/coaches/${userId}.json`,
      {
        method: "PUT",
        body: JSON.stringify(updatedPayload),
      }
    );

    //const responsData = await response.json();

    if (!response.ok) {
      //error...
    }

    context.commit(
      "coaches/addCoachToList",
      {
        ...updatedPayload,
        id: userId,
      },
      { root: true }
    );
  },

  async loadCoaches(context) {
    const response = await fetch(
      `https://vue-http-demo-dd2b3.firebaseio.com/coaches.json`
    );
    const responseData = await response.json();

    if (!response.ok) {
      //error..
    }
    const coaches = [];
    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas,
      };
      coaches.push(coach);
      context.commit("setCoaches", coaches)
    }
  },
  setAsRegistered(context, payload) {
    context.commit("coaches/setIsRegistered", payload, { root: true });
  },
};
