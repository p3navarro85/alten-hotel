import { Component, OnInit } from '@angular/core';
import { Reservation, ReservationState } from '../../shared/models/reservation.model';
import { Observable } from 'rxjs';
import { Room, RoomType, RoomFilter, RoomState } from '../../shared/models/room.model';
import { ReservationService } from '../../shared/services/reservation.service';
import { RoomService } from '../../shared/services/room.service';
declare var jQuery: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    reservation: Reservation;
    rooms$: Observable<Room[]>;
    hideReservationConfirmation = true;
    roomTypes = [];
    numberOfPersons = [0,1,2,3];
    filter: RoomFilter = new RoomFilter();
    
    constructor(
        private reservationService: ReservationService,
        private roomService: RoomService) { }

    ngOnInit(): void {
        /*------------------
            Preloader
        --------------------*/
        setTimeout(function(){ 
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");
        }, 1000);

        (function ($) {
        
            /*------------------
                Background Set
            --------------------*/
            $('.set-bg').each(function () {
                console.log("here2");
                var bg = $(this).data('setbg');
                $(this).css('background-image', 'url(' + bg + ')');
            });
        
            /*------------------
            Navigation
            --------------------*/
            $(".mobile-menu").slicknav({
                prependTo: '#mobile-menu-wrap',
                allowParentLinks: true
            });
        
            /*------------------
            Date Picker
            --------------------*/
            $(".datepicker-1").datepicker();
            $(".datepicker-2").datepicker();
        
            /*------------------
            Nice Selector
            --------------------*/
            $('.suit-select').niceSelect();
        
        
            /*------------------
                Room Pic Slider
            --------------------*/
            $(".room-pic-slider").owlCarousel({
                loop: true,
                margin: 0,
                nav: true,
                items: 1,
                dots: false,
                navText: ['<i class="lnr lnr-arrow-left"></i>', '<i class="lnr lnr-arrow-right"></i>'],
                smartSpeed: 800,
                autoplay: false,
            });
        
            /*-------------------
            Quantity change
            --------------------- */
            var proQty = $('.pro-qty');
            proQty.prepend('<span class="dec qtybtn">-</span>');
            proQty.append('<span class="inc qtybtn">+</span>');
            proQty.on('click', '.qtybtn', function () {
                var $button = $(this);
                var oldValue = $button.parent().find('input').val();
                if ($button.hasClass('inc')) {
                    var newVal = parseFloat(oldValue) + 1;
                } else {
                    // Don't allow decrementing below zero
                    if (oldValue > 0) {
                        var newVal = parseFloat(oldValue) - 1;
                    } else {
                        newVal = 0;
                    }
                }
                $button.parent().find('input').val(newVal);
            });
        
            /*------------------
                Magnific Popup
            --------------------*/
            $('.pop-up').magnificPopup({
                type: 'iframe'
            });
        
        })(jQuery);

        this.reservation = new Reservation();
        this.reservation.reservationState = ReservationState.Confirmed;
        this.reservation.startedDate = new Date();
        this.reservation.endDate = new Date();
        this.reservation.endDate.setDate(this.reservation.startedDate.getDate() + 3);
        this.reservation.room = new Room();
        this.rooms$ = this.roomService.rooms;
        for (const [key, value] of Object.entries(RoomType)) {
            let qs = {key, value};
            this.roomTypes.push(qs);
        }
        this.filter.state = RoomState.Available;
    }

    Reservate(){
        if(this.validateForm()){
            this.reservationService.create(this.reservation);
            this.hideReservationConfirmation = false;
        }
    }

    Continue(){
        this.hideReservationConfirmation = true;
        window.location.reload();
    }

    onChangeRoom($event){
        this.reservation.roomId = $event.item.id;
        this.reservation.room = $event.item;
    }

    startedDateChanged($event){
        console.log('startedDateChanged');
        var date = new Date($event.target.valueAsDate);
        date.setDate(date.getDate()+1);
        this.reservation.startedDate = date;
        this.reservation.endDate = date;
        console.log(date.toDateString());
        console.log(date.toISOString().split('T')[0]);
    }

    endDateChanged($event){
        var date = new Date($event.target.valueAsDate);
        date.setDate(date.getDate()+1);
        this.reservation.endDate = date;
    }

    roomTypeChange($event){
        this.roomService.loadFilteredRoms(this.filter);
    }

    validateForm():boolean{
        console.log('validateForm');
        jQuery("#reservationForm").validate({
          rules: {
            ownerEmail: {
              required: true,
              email: true
            }
          },
          messages: {
            startedDate: "Please enter a valid started date",
            endDate: "Please enter a valid end date",
            ownerEmail: "Please enter a valid owner email"
          },
          highlight: function(element) {
            jQuery(element).closest('.form-group').addClass('has-error');
            jQuery(element).closest('.form-control').addClass(':invalid');
          },
          unhighlight: function(element) {
            jQuery(element).closest('.form-group').removeClass('has-error');
          },
          errorElement: 'span',
          errorClass: 'invalid-feedback',
          errorPlacement: function(error, element) {
            if(element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
          }
        });
        jQuery("#reservationForm").addClass('was-validated');
        return jQuery("#reservationForm").valid();
      }

}
