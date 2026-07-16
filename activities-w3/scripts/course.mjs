const byuiCourse = {
  code: "WDD231",
  name: "Web Frontend Development I",
  sections: [
    {
      sectionNumber: 1,
      enrolled: 26,
      seats: 30
    },
    {
      sectionNumber: 2,
      enrolled: 25,
      seats: 30
    },
    {
      sectionNumber: 3,
      enrolled: 25,
      seats: 30
    }
  ],
  changeEnrollment: function (sectionNum, enroll = true) {
    const sectionIndex = this.sections.findIndex(
      (section) => section.sectionNumber == sectionNum
    );
    if (sectionIndex >= 0) {
      if (enroll) {
        this.sections[sectionIndex].enrolled++;
      } else {
        this.sections[sectionIndex].enrolled--;
      }
    }
  }
};