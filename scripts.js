// Your API endpoint
var API_ENDPOINT = "https://lco08acj8j.execute-api.us-east-1.amazonaws.com/prod";

let editingId = null; // Track which student is being edited

// Save or Update student
document.getElementById("savestudent").onclick = function() {
  var inputData = {
    "studentid": $('#studentid').val(),
    "name": $('#name').val(),
    "class": $('#class').val(),
    "age": $('#age').val()
  };

  if (!inputData.studentid) {
    alert("Student ID is required!");
    return;
  }

if (editingId) {
  // --- UPDATE student (PUT request) ---
  const inputData = {
    studentid: editingId,              // Must include studentid — required by Lambda
    name: $("#name").val(),            // Assuming input fields with IDs: name, class, age
    class: $("#class").val(),
    age: parseInt($("#age").val())     // Convert to number
  };

  $.ajax({
    url: API_ENDPOINT,                 // Example: https://abc123.execute-api.us-east-1.amazonaws.com/dev/student
    type: 'PUT',
    data: JSON.stringify(inputData),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',                  // Expect JSON back
    success: function(response) {
      console.log("Update success:", response);
      document.getElementById("studentSaved").innerHTML = "✅ Student Updated Successfully!";
      resetForm();
      loadStudents();
    },
    error: function(xhr) {
      console.error("Error updating student:", xhr.responseText);
      alert("❌ Error updating student data. " + (xhr.responseJSON?.error || ""));
    }
  });
  } else {
    // --- CREATE student (POST request) ---
    $.ajax({
      url: API_ENDPOINT,
      type: 'POST',
      data: JSON.stringify(inputData),
      contentType: 'application/json; charset=utf-8',
      success: function() {
        document.getElementById("studentSaved").innerHTML = "✅ Student Data Saved!";
        resetForm();
        loadStudents();
      },
      error: function() {
        alert("Error saving student data.");
      }
    });
  }
};

// Load all students
document.getElementById("getstudents").onclick = function() {
  loadStudents();
};

function loadStudents() {
  $.ajax({
    url: API_ENDPOINT,
    type: 'GET',
    contentType: 'application/json; charset=utf-8',
    success: function(response) {
      $('#studentTable tbody').empty();
      jQuery.each(response, function(i, data) {
        $("#studentTable tbody").append(`
          <tr>
            <td>${data['studentid']}</td>
            <td>${data['name']}</td>
            <td>${data['class']}</td>
            <td>${data['age']}</td>
            <td>
              <button class="action-btn editBtn" data-id="${data['studentid']}" data-name="${data['name']}" data-class="${data['class']}" data-age="${data['age']}">Edit</button>
              <button class="action-btn deleteBtn" data-id="${data['studentid']}">Delete</button>
            </td>
          </tr>
        `);
      });

      // Attach event listeners after loading
      $(".editBtn").click(function() {
        const id = $(this).data('id');
        const name = $(this).data('name');
        const studentClass = $(this).data('class');
        const age = $(this).data('age');

        $('#studentid').val(id);
        $('#name').val(name);
        $('#class').val(studentClass);
        $('#age').val(age);

        editingId = id;
        $("#savestudent").val("Update Student");
        document.getElementById("studentSaved").innerHTML = "✏️ Editing student ID: " + id;
      });

      $(".deleteBtn").click(function() {
        const id = $(this).data('id');
        if (confirm("Are you sure you want to delete student ID: " + id + "?")) {
          deleteStudent(id);
        }
      });
    },
    error: function() {
      alert("Error retrieving student data.");
    }
  });
}

// Delete student
function deleteStudent(id) {
  // Show a loading message or spinner while the request is in progress
  document.getElementById("studentSaved").innerHTML = "🕐 Deleting student... Please wait.";

  // Perform the DELETE request
  $.ajax({
    url: API_ENDPOINT + "?studentid=" + id,  // Send student ID as a query parameter
    type: 'DELETE',  // DELETE request to remove the student
    success: function(response) {
      // Notify the user that the student was deleted successfully
      document.getElementById("studentSaved").innerHTML = "🗑️ Student Deleted Successfully!";
      // Reload the student list to reflect the changes
      loadStudents();
    },
    error: function(xhr, status, error) {
      // Handle errors
      console.error("Error deleting student:", error);
      alert("❌ Error deleting student data. Please try again.");
      document.getElementById("studentSaved").innerHTML = "❌ Error deleting student.";
    }
  });
}


// Reset form
function resetForm() {
  $('#studentid').val('');
  $('#name').val('');
  $('#class').val('');
  $('#age').val('');
  editingId = null;
  $("#savestudent").val("Save Student Data");
}
