new Vue({
  el: '#events',
  components: {

  },
  data: {
    events: [],

    namefilter: "",
    categoryfilter: "",
    
    weekfilter: [],
    monthfilter: [],

    currentSort:'EventDate',
    currentSortDir:'asc'
  },
  created () {
    axios.get("https://cors-events.herokuapp.com/")
    .then(response => {
	// console.log(response);
    this.events = response.data.Data
	})
  },

  methods: {
    isValidEvent: function(event){
      var date = event.EventDate;
      var sliced = date.slice(0,-9);
      
      // var validDay = sliced.includes(this.dayfilter)
      var validWeek = ( sliced.includes(this.weekfilter[0]) || sliced.includes(this.weekfilter[1]) || sliced.includes(this.weekfilter[2]) || sliced.includes(this.weekfilter[3]) || sliced.includes(this.weekfilter[4]) || sliced.includes(this.weekfilter[5]) || sliced.includes(this.weekfilter[6]));

      var validMonth = ( sliced.includes(this.monthfilter[0]) || sliced.includes(this.monthfilter[1]) || sliced.includes(this.monthfilter[2]) || sliced.includes(this.monthfilter[3]) || sliced.includes(this.monthfilter[4]) || sliced.includes(this.monthfilter[5]) || sliced.includes(this.monthfilter[6]) || sliced.includes(this.monthfilter[7]) || sliced.includes(this.monthfilter[8]) || sliced.includes(this.monthfilter[9]) || sliced.includes(this.monthfilter[10]) || sliced.includes(this.monthfilter[11]) || sliced.includes(this.monthfilter[12]) || sliced.includes(this.monthfilter[13]) || sliced.includes(this.monthfilter[14]) || sliced.includes(this.monthfilter[15]) || sliced.includes(this.monthfilter[16]) || sliced.includes(this.monthfilter[17]) || sliced.includes(this.monthfilter[18]) || sliced.includes(this.monthfilter[19]) || sliced.includes(this.monthfilter[20]) || sliced.includes(this.monthfilter[21]) || sliced.includes(this.monthfilter[22]) || sliced.includes(this.monthfilter[23]) || sliced.includes(this.monthfilter[24]) || sliced.includes(this.monthfilter[25]) || sliced.includes(this.monthfilter[26]) || sliced.includes(this.monthfilter[27]) || sliced.includes(this.monthfilter[28]) || sliced.includes(this.monthfilter[29]) || sliced.includes(this.monthfilter[30]));
      
      var validName = event.EventName.toLowerCase().includes(this.namefilter.toLowerCase());
      var validCategory = event.Categories[0].Name.toLowerCase().includes(this.categoryfilter.toLowerCase());

      if (this.weekfilter.length !==0) 
      {
        return validWeek;
      }
      else if (this.monthfilter.length !==0)
      {
        return validMonth;
      }
      else 
      {
        return validName && validCategory;
      }
    },
    
    addWeekArray: function(){
      var i;
      for (i=1; i<=7; i++) {
        var weekday = new Date();
        weekday.setDate(weekday.getDate()+i);
        var fweekday = moment(weekday).format("YYYY-MM-DD");

        this.weekfilter.push(fweekday);
      };

      this.monthfilter = [];

      var element = document.getElementById("month-id");
      element.classList.remove("month-class");
    },

    addMonthArray: function(){
      var i;
      for (i=1; i <=30; i++ ) {
        var monthday = new Date();
        monthday.setDate(monthday.getDate()+i);
        var fmonthday = moment(monthday).format("YYYY-MM-DD");

        this.monthfilter.push(fmonthday);
      };

      this.weekfilter = [];
    },

    clearData: function(){
      this.categoryfilter = ""; 
      this.namefilter = "";
      // this.tomorrowfilter = "";
      this.weekfilter = [];
      this.monthfilter = [];
      this.currentSort= 'name';

      var element = document.getElementById("month-id");
      element.classList.remove("month-class");
    },

    clearDateFilter: function(){
      this.monthfilter = [];
      this.weekfilter = [];

      var element = document.getElementById("month-id");
      element.classList.remove("month-class");
    },

    displayDate: function(date){
      return moment(date).format("dddd, MMMM D, YYYY");
      // return moment(date).format("LLLL");
    },

    sort: function(s) {
      //if s == current sort, reverse
      if(s === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      }
      this.currentSort = s;
    },

    tConvert: function(time) {
      // Check correct time format and split into components
      time = time.slice(0, -3);
      time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    
      if (time.length > 1) { // If time format correct
        time = time.slice (1);  // Remove full string match value
        time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
      }
      return time.join ('') // return adjusted time or original string
    }
  },
  
  beforeMount(){
    this.addMonthArray();
    document.getElementById("month-button").className = "month-button";
  },
  
  computed: {
    sortedEvents:function() {
      return this.events.sort((a,b) => {
        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;
        if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      });
    },
  },    
});





























// calculate upcoming dates
// var today = new Date();
// var dd = today.getDate();
// var mm = today.getMonth()+1; //January is 0!
// var yyyy = today.getFullYear();

// if(dd<10) {
//     dd = '0'+dd
// } 

// if(mm<10) {
//     mm = '0'+ mm
// } 
// today = yyyy + '-' + mm + '-' + dd;


// var tomorrow = new Date();
// var dd = tomorrow.getDate() + 1;
// var mm = tomorrow.getMonth()+1; //January is 0!
// var yyyy = tomorrow.getFullYear();

// if(dd<10) {
//     dd = '0'+dd
// } 

// if(mm<10) {
//     mm = '0'+ mm
// } 
// tomorrow = yyyy + '-' + mm + '-' + dd;




// weekarray = ["2017-10-22", "2018-12-17"];
// document.getElementById("today").value = today;
// document.getElementById("tomorrow").value = tomorrow;
// document.getElementById("week").value = new Array("2017-10-22", "2018-12-17");



// function getEventArray(event){
//   axios.get("https://cors-events.herokuapp.com/")
//   .then(response => {
//   // console.log(response);
//   this.events = response.data.Data;
   
//   // this.events.forEach (x => console.log(x.EventDate.slice(0,-9)));
  
//   for (var i = 0, len = this.events.length; i < len; i++) {
//     if ((this.events[i].EventDate.slice(0,-9) == "2017-10-22") || (this.events[i].EventDate.slice(0,-9) == "2018-12-17")) {
//       console.log(events[i])
//     }
//   }
// })
// };

// console.log(getEventArray());






      // var today = new Date();
      // today.setDate(today.getDate());
      // var ftoday = moment(today).format("YYYY-MM-DD");

      // var tomorrow = new Date();
      // tomorrow.setDate(tomorrow.getDate()+1);
      // var ftomorrow = moment(tomorrow).format("YYYY-MM-DD");

      // var second = new Date();
      // second.setDate(second.getDate()+2);
      // var fsecond = moment(second).format("YYYY-MM-DD");

      // var third = new Date();
      // third.setDate(third.getDate()+3);
      // var fthird = moment(third).format("YYYY-MM-DD");

      // var fourth = new Date();
      // fourth.setDate(fourth.getDate()+4);
      // var ffourth = moment(fourth).format("YYYY-MM-DD");

      // var fifth = new Date();
      // fifth.setDate(fifth.getDate()+5);
      // var ffifth = moment(fifth).format("YYYY-MM-DD");

      // var sixth = new Date();
      // sixth.setDate(sixth.getDate()+6);
      // var fsixth = moment(sixth).format("YYYY-MM-DD");

      // var seventh = new Date();
      // seventh.setDate(seventh.getDate()+7);
      // var fseventh = moment(seventh).format("YYYY-MM-DD");

      // var eighth = new Date();
      // eighth.setDate(eighth.getDate()+8);
      // var feighth = moment(eighth).format("YYYY-MM-DD");

      // var ninth = new Date();
      // ninth.setDate(ninth.getDate()+9);
      // var fninth = moment(ninth).format("YYYY-MM-DD");

      // var ten = new Date();
      // ten.setDate(ten.getDate()+10);
      // var ften = moment(ten).format("YYYY-MM-DD");

      // var eleven = new Date();
      // eleven.setDate(eleven.getDate()+11);
      // var feleven = moment(eleven).format("YYYY-MM-DD");

      // var twelve = new Date();
      // twelve.setDate(twelve.getDate()+12);
      // var ftwelve = moment(twelve).format("YYYY-MM-DD");

      // var thirteen = new Date();
      // thirteen.setDate(thirteen.getDate()+13);
      // var fthirteen = moment(thirteen).format("YYYY-MM-DD");

      // var fourteen = new Date();
      // fourteen.setDate(fourteen.getDate()+14);
      // var ffourteen = moment(fourteen).format("YYYY-MM-DD");

      // var fifteen = new Date();
      // fifteen.setDate(fifteen.getDate()+15);
      // var ffifteen = moment(fifteen).format("YYYY-MM-DD");

      // var sixteen = new Date();
      // sixteen.setDate(sixteen.getDate()+16);
      // var fsixteen = moment(sixteen).format("YYYY-MM-DD");

      // var seventeen = new Date();
      // seventeen.setDate(seventeen.getDate()+17);
      // var fseventeen = moment(seventeen).format("YYYY-MM-DD");

      // var eighteen = new Date();
      // eighteen.setDate(eighteen.getDate()+18);
      // var feighteen = moment(eighteen).format("YYYY-MM-DD");

      // var nineteen = new Date();
      // nineteen.setDate(nineteen.getDate()+19);
      // var fnineteen = moment(nineteen).format("YYYY-MM-DD");

      // var twenty = new Date();
      // twenty.setDate(twenty.getDate()+20);
      // var ftwenty = moment(twenty).format("YYYY-MM-DD");
      
      // var twentyone = new Date();
      // twentyone.setDate(twentyone.getDate()+21);
      // var ftwentyone = moment(twentyone).format("YYYY-MM-DD");

      // var twentytwo = new Date();
      // twentytwo.setDate(twentytwo.getDate()+22);
      // var ftwentytwo = moment(twentytwo).format("YYYY-MM-DD");

      // var twentythree = new Date();
      // twentythree.setDate(twentythree.getDate()+23);
      // var ftwentythree = moment(twentythree).format("YYYY-MM-DD");

      // var twentyfour = new Date();
      // twentyfour.setDate(twentyfour.getDate()+24);
      // var ftwentyfour = moment(twentyfour).format("YYYY-MM-DD");

      // var twentyfive = new Date();
      // twentyfive.setDate(twentyfive.getDate()+25);
      // var ftwentyfive = moment(twentyfive).format("YYYY-MM-DD");

      // var twentysix = new Date();
      // twentysix.setDate(twentysix.getDate()+26);
      // var ftwentysix = moment(twentysix).format("YYYY-MM-DD");

      // var twentyseven = new Date();
      // twentyseven.setDate(twentyseven.getDate()+27);
      // var ftwentyseven = moment(twentyseven).format("YYYY-MM-DD");

      // var twentyeight = new Date();
      // twentyeight.setDate(twentyeight.getDate()+28);
      // var ftwentyeight = moment(twentyeight).format("YYYY-MM-DD");

      // var twentynine = new Date();
      // twentynine.setDate(twentynine.getDate()+29);
      // var ftwentynine = moment(twentynine).format("YYYY-MM-DD");

      // var thirty = new Date();
      // thirty.setDate(thirty.getDate()+30);
      // var fthirty = moment(thirty).format("YYYY-MM-DD");

      
      // this.monthfilter.push(ftomorrow);
      // this.monthfilter.push(fsecond);
      // this.monthfilter.push(fthird);
      // this.monthfilter.push(ffourth);
      // this.monthfilter.push(ffifth);
      // this.monthfilter.push(fsixth);
      // this.monthfilter.push(fseventh);
      // this.monthfilter.push(feighth);
      // this.monthfilter.push(fninth);
      // this.monthfilter.push(ften);
      // this.monthfilter.push(feleven);
      // this.monthfilter.push(ftwelve);
      // this.monthfilter.push(fthirteen);
      // this.monthfilter.push(ffourteen);
      // this.monthfilter.push(ffifteen);
      // this.monthfilter.push(fsixteen);
      // this.monthfilter.push(fseventeen);
      // this.monthfilter.push(feighteen);
      // this.monthfilter.push(fnineteen);
      // this.monthfilter.push(ftwenty);
      // this.monthfilter.push(ftwentyone);
      // this.monthfilter.push(ftwentytwo);
      // this.monthfilter.push(ftwentythree);
      // this.monthfilter.push(ftwentyfour);
      // this.monthfilter.push(ftwentyfive);
      // this.monthfilter.push(ftwentysix);
      // this.monthfilter.push(ftwentyseven);
      // this.monthfilter.push(ftwentyeight);
      // this.monthfilter.push(ftwentynine);
      // this.monthfilter.push(fthirty);


      // WEEK
      // var today = new Date();
      // today.setDate(today.getDate());
      // var ftoday = moment(today).format("YYYY-MM-DD");

      // var tomorrow = new Date();
      // tomorrow.setDate(tomorrow.getDate()+1);
      // var ftomorrow = moment(tomorrow).format("YYYY-MM-DD");

      // var second = new Date();
      // second.setDate(second.getDate()+2);
      // var fsecond = moment(second).format("YYYY-MM-DD");

      // var third = new Date();
      // third.setDate(third.getDate()+3);
      // var fthird = moment(third).format("YYYY-MM-DD");

      // var fourth = new Date();
      // fourth.setDate(fourth.getDate()+4);
      // var ffourth = moment(fourth).format("YYYY-MM-DD");

      // var fifth = new Date();
      // fifth.setDate(fifth.getDate()+5);
      // var ffifth = moment(fifth).format("YYYY-MM-DD");

      // var sixth = new Date();
      // sixth.setDate(sixth.getDate()+6);
      // var fsixth = moment(sixth).format("YYYY-MM-DD");

      // var seventh = new Date();
      // seventh.setDate(seventh.getDate()+7);
      // var fseventh = moment(seventh).format("YYYY-MM-DD");

      // this.weekfilter.push(ftomorrow);
      // this.weekfilter.push(fsecond);
      // this.weekfilter.push(fthird);
      // this.weekfilter.push(ffourth);
      // this.weekfilter.push(ffifth);
      // this.weekfilter.push(fsixth);
      // this.weekfilter.push(fseventh);
