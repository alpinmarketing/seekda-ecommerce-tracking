<script>
// Track Seekda IBE Events with GA4, Matomo and Google Ads
document.addEventListener('DOMContentLoaded', function () {
    var _paq = window._paq = window._paq || [];  
    var _skd = window._skd || {};
    _skd.callbacks = _skd.callbacks || {};
    _skd.callbacks.dsr = _skd.callbacks.dsr || {};
    _skd.callbacks.dsr.searchBtnClick = function(data) {
        var _paq = window._paq = window._paq || [];
        var gtag = window.gtag = window.gtag || []; 
        gtag('event', 'view_search_results', {'event_category': 'seekda','event_label': 'suche',});
        _paq.push(['trackEvent', 'seekda', 'suche', '']);
    }
    _skd.callbacks.dsr.viewOffers = function(data) {
        var _paq = window._paq = window._paq || [];
        var gtag = window.gtag = window.gtag || [];
        gtag('event', 'view_search_results', {'event_category': 'seekda','event_label': 'ansicht-angebote',});
        _paq.push(['trackEvent','seekda','ansicht','angebot']);
    }
    _skd.callbacks.dsr.viewRoom = function(data) {
        var _paq = window._paq = window._paq || [];
        var gtag = window.gtag = window.gtag || [];
        gtag('event', 'view_search_results', {'event_category': 'seekda','event_label': 'ansicht-zimmer',});
        _paq.push(['trackEvent','seekda','ansicht','zimmer']);
    }
    _skd.callbacks.dsr.viewPackage = function(data) {
        var _paq = window._paq = window._paq || [];
        var gtag = window.gtag = window.gtag || [];
        gtag('event', 'view_item', {'event_category': 'seekda','event_label': 'ansicht-package',});
        _paq.push(['trackEvent','seekda','ansicht','package']);
    }
    _skd.callbacks.dsr.viewOfferDetails = function(data) {
        var _paq = window._paq = window._paq || [];
        var gtag = window.gtag = window.gtag || [];
        gtag('event', 'begin_checkout', {'event_category': 'seekda','event_label': 'ansicht-angebotsdetails',});
        _paq.push(['trackEvent','seekda','ansicht','angebotsdetails']);
    }
    _skd.callbacks.dsr.viewPersInfo = function(data) {
        var _paq = window._paq = window._paq || [];
        var gtag = window.gtag = window.gtag || [];
        gtag('event', 'add_payment_info', {'event_category': 'seekda','event_label': 'ansicht-persönliche-infos',});
        _paq.push(['trackEvent','seekda','ansicht','persönliche infos']);
    }
    _skd.callbacks.dsr.viewConfirmation = function(data) {
        var gtag = window.gtag = window.gtag || [];
        var _paq = window._paq = window._paq || [];
        // Insert here the Google Ads Conversion AW-Tracking Code including the label
        var adwordsidlabel = 'AW-xxxxxxxxxx/label'; 
        gtag('event', 'view_item_list', {'event_category': 'seekda','event_label': 'reservierung',}); // Analytics Zielvorhaben Danke Seite
        gtag('event', 'conversion', {'send_to': adwordsidlabel}); // Google Ads Conversion Tracking
        /* E-Commerce Tracking */
        var i = 0;
        date = new Date(Date.parse(data.searchData.endDate) - Date.parse(data.searchData.startDate)); // parsing the date for quantity length of stay calc
        quantity = (date.getDate() > 1) ? date.getDate() - 1 : 1; // calculating the quantity, length of stay
        var items = [];
        for (i = 0; i < data.searchData.rooms.length; i++) {
            //adding transaction items depending on how many rooms are booked.
            room = data.searchData.rooms[i];
            items.push({
                'id': data.reservationId, // Transaction ID in seekda Reservation ID. Required.
                'name': data.selectedRateCodes[i], // prodcut name are ratecodes. Required.
                'sku': data.selectedRoomCodes[i], // sku are roomcodes
                'category': 'Adults: ' + room.adults + ', Children: ' + room.children.total, // category is adults and children
                'price':    room.roomTotal/quantity,  // send price for each room devided by quantity
                'quantity': quantity // quantity. calculated by endDate - startDate, length of stay
            });
            _paq.push(['addEcommerceItem',
                data.selectedRoomCodes[i],
                data.selectedRateCodes[i],
                'Adults: ' + room.adults + ', Children: ' + room.children.total,
                room.roomTotal/quantity,
                quantity
            ]);
        }
        var _umsatz = data.total || 0;
		gtag('event', 'purchase', {
		 'transaction_id': data.reservationId,
		 'affiliation': 'seekda',
		 'value': _umsatz,
         'currency': 'EUR',
		 'tax': 0,
		 'shipping': 0,
		 'items': items
		});
        _paq.push(['trackEvent','seekda','buchung','reservierung',_umsatz]);
        _paq.push(['trackEcommerceOrder', data.reservationId, _umsatz, null, null, null, false]);
    };
});
</script>
