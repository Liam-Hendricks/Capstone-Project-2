

module.exports={
    //function that takes in the category string and sends url path
    PATH:function(text){
        switch(text) {
           
            case 'Movie':
                return '/movie';
            case 'Podcast':
                return '/podcast';
            case 'Music':
                return '/music';
            case 'Audiobook':
                return '/audiobook';

            case 'Short Film':
                return '/shortfilm';
            case 'TV show':
                return '/tvshow';
            case 'Software':
                return '/software';
            case 'Ebook':
                return '/ebook';
            case 'All':
                return '/all';
            default:
                return '/all';
          }
    },
    //function that converts time in milliseconds to standard time string
    TIME:function msToTime(s) {
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;

       
        if(mins<10){
            mins=`0${mins}`;
        }
        if(secs<10){
            secs=`0${secs}`;
        }
        if(hrs===0){
            return `${mins} min ${secs} sec`;
        }
        else{
            return `${hrs} hour ${mins} min ${secs} sec`;
        }
       
      },
    //function for converting month in number to month in words
    MONTH:function(month){
        switch(month){
            case 0:
                return 'January';
            case 1:
                return 'February';
            case 2:
                return 'March'; 
            case 3:
                return 'April';
            case 4:
                return 'May';
            case 5:
                return 'June';
            case 6:
                return 'July';
            case 7:
                return 'August';
            case 8:
                return 'September';
            case 9:
                return 'October';
            case 10:
                return 'November';
            case 11:
                return 'December';
            default:
                return null
        }

    },
    //function takes in array of objects and id and return array containing only the object which has that id 
    GetObject:function(Array,id){
        let filtered = Array.filter(function (el) {
            return el.trackId === id;
        });
        return filtered[0];
    },
    //function takes in array of objects and returns boolean  based on whether object with certain id is in array
    ONList:function(Array,id){
        if(Array.length===0){
            return false;
        }else{
           
            for (let i = 0; i < Array.length; i++) {
                if (Array[i].trackId === id) {
                    return true;
                }
            }
        
            return false;
        }
       
    },
    //function which takes in array of objects and id .Returns array of objects without object which as that id
    removeItem:function(Array,id){
        if(Array.length===1){
            return Array.length=0;
        }else{
            let filtered = Array.filter(function (el) {
                return el.trackId !== id;
            });
            return filtered;
        }
        
    }
    
     
       
      
    
}