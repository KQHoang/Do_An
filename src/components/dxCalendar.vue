<template>
     <DxScheduler
      time-zone="America/Los_Angeles"
      :data-source="dataSource"
      :current-date="currentDate"
      :height="650"
      current-view="month"
    >
    </DxScheduler>
</template>
<script>
import DxScheduler  from 'devextreme-vue/scheduler';
export default {
  name: "DxCalendar",
  components: {
    DxScheduler,
  },
  data() {
    return {
      currentDate: new Date(2021, 2, 25),
      dataSource: [
    {
        text: 'Google AdWords Strategy',
        startDate: new Date('2021-03-05T16:00:00.000Z'),
        endDate: new Date('2021-03-05T17:30:00.000Z'),
    }, {
        text: 'New Brochures',
        startDate: new Date('2021-03-05T18:30:00.000Z'),
        endDate: new Date('2021-03-05T21:15:00.000Z'),
    },

    ],
      resourcesData:  [
        {
            text: 'Room 401',
            id: 1,
            color: '#bbd806',
        }, {
            text: 'Room 402',
            id: 2,
            color: '#f34c8a',
        }, {
            text: 'Room 403',
            id: 3,
            color: '#ae7fcc',
        }, {
            text: 'Room 407',
            id: 4,
            color: '#ff8817',
        }, {
            text: 'Room 409',
            id: 5,
            color: '#03bb92',
        },
        ],
    };
  },
};
</script>