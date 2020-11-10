export default {
  contactCoach(context, formData) {
    const newRequest = {
      id: new Date().toISOString,
      coachId: formData.coachId,
      userEmail: formData.email,
      userMessage: formData.message,
    };
    context.commit("addRequest", newRequest);
  },
};
