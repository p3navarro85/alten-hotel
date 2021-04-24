// Call the dataTables jQuery plugin
$(document).ready(function() {
  console.log('heeeeeeeeere');
  if($('#quoteTable').length !== 0){
    $('#quoteTable').DataTable();
  }

  if($('#accountTable').length !== 0){
    $('#accountTable').DataTable();
  }
  
  if($('#dealTable').length !== 0){
    $('#dealTable').DataTable();
  }

  if($('#contactTable').length !== 0){
    $('#contactTable').DataTable();
  }
   /*

  if($('#phaseTable').length !== 0){
    $('#phaseTable').DataTable();
  }

 
  
  if($('#systemTable').length !== 0){
    $('#systemTable').DataTable();
  }

  */

  if($('#movilizationTable').length !== 0){
    $('#movilizationTable').DataTable();
  }
});
