$(document).ready(function() {
    userHttp("http://localhost:8000");
    portfolioHttp("http://localhost:8000");


    $(".toggle-button").each(function(i, obj) {
        $(document).find($(".toggle-button")[i]).click(function() {
            $(this).toggleClass("active");
            var section = $(document).find($(".toggleable")[i]);
            if (section.css("max-height") == "0px") {
                section.css("max-height", $(".toggleable")[i].scrollHeight + "px");
            } else {
                section.css("max-height", "0px");
            }
        });
    });
});

function debug() {
    /* console.log("DEBUG OK."); */

    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:8000/users/", false);
    request.send();
    var array = JSON.parse(request.responseText);
    $.each(array.results, function(i, userObj) {
        $.each(userObj.portfolio, function(i, portfolioObj) {
            if (portfolioObj.hasOwnProperty("ticker")) {
                var test = portfolioObj.ticker + " (" + portfolioObj.amount + ")";
                console.log(test);
                $(".section-test").append(test);
            }
        });
    });
}

function userHttp(host) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            $(".user-count").html("Total users: " + response.count);
            $.each(response.results, function(i, userObj) {
                var userRow = $("<tr></tr>");
                $(".user-table").append(userRow);

                userData = $("<td></td>");
                userData.html(userObj.id);
                userRow.append(userData);

                userData = $("<td></td>");
                userData.html(userObj.username);
                userRow.append(userData);

                userData = $("<td></td>");
                userRow.append(userData);
                $.each(userObj.portfolio, function(i, portfolioObj) {
                    var portfolioUrl = $("<a></a>");
                    portfolioUrl.attr("href", portfolioObj.url);
                    portfolioUrl.text(portfolioObj.ticker);
                    userData.append(portfolioUrl);
                    userData.append(" (" + portfolioObj.amount + "), ");
                });

                userData = $("<td></td>");
                var userUrl = $("<a></a>");
                userUrl.attr("href", userObj.url);
                userUrl.html(userObj.url);
                userData.append(userUrl);
                userRow.append(userData);
            });
        }
    };
    request.open("GET", "http://localhost:8000/users/", true);
    request.send();
}

function portfolioHttp(host) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            $(".portfolio-count").text("Total portfolios: " + response.count);
            $.each(response.results, function(i, portfolioObj) {
                var rowPortfolio = $("<tr></tr>", {"class" : "portfolio-data"});
                $(".portfolio-table").append(rowPortfolio);

                var dataId = $("<td></td>");
                dataId.text(portfolioObj.id);
                rowPortfolio.append(dataId);

                var dataTicker = $("<td></td>");
                dataTicker.text(portfolioObj.ticker);
                rowPortfolio.append(dataTicker);

                var dataName = $("<td></td>");
                dataName.text(portfolioObj.name);
                rowPortfolio.append(dataName);

                var dataAmount = $("<td></td>");
                dataAmount.text(portfolioObj.amount);
                rowPortfolio.append(dataAmount);

                var dataPlatform = $("<td></td>");
                dataPlatform.text(portfolioObj.platform);
                rowPortfolio.append(dataPlatform);

                var dataOwner = $("<td></td>");
                var ownerUrl = $("<a></a>");
                ownerUrl.attr("href", portfolioObj.owner.url);
                ownerUrl.text(portfolioObj.owner.username);
                dataOwner.append(ownerUrl);
                rowPortfolio.append(dataOwner);

                var dataUrl = $("<td></td>");
                var portfolioUrl = $("<a></a>");
                portfolioUrl.attr("href", portfolioObj.url);
                portfolioUrl.html(portfolioObj.url);
                dataUrl.append(portfolioUrl);
                rowPortfolio.append(dataUrl);

                // EDIT BUTTON
                var dataEdit = $("<td></td>", {"class" : "data-button"});
                rowPortfolio.append(dataEdit);
                var edit = $("<button></button>", {"class" : "table-button edit"});
                dataEdit.append(edit);
                edit.html("EDIT");

                edit.click(function() {
                    edit.addClass("edit-save");
                    edit.html("SAVE");

                    var inputTicker = $("<input>", {"type" : "text", "class" : "ticker", "value": dataTicker.text()});
                    dataTicker.replaceWith($("<td></td>", {"class" : "table-input"}).append(inputTicker));

                    var inputName = $("<input>", {"type" : "text", "class" : "name", "value": dataName.text()});
                    dataName.replaceWith($("<td></td>", {"class" : "table-input"}).append(inputName));

                    var inputAmount = $("<input>", {"type" : "text", "class" : "amount", "value": dataAmount.text()});
                    dataAmount.replaceWith($("<td></td>", {"class" : "table-input"}).append(inputAmount));

                    edit.click(function() {
                        var json = new Object();

                        json.id = portfolioObj.id;
                        json.ticker = inputTicker.val();
                        json.name = inputName.val();
                        json.amount = inputAmount.val();
                        json.platform = portfolioObj.platform;
                        json.owner = portfolioObj.owner;
                        json.url = portfolioObj.url;

                        var jsonData = JSON.stringify(json);
                        var reqPOST = new XMLHttpRequest();
                        reqPOST.onreadystatechange = function() {
                            if (this.readyState == 4) { /*  && this.status == 200 */
                                /* var res = JSON.parse(reqPOST.responseText);
                                console.log(res); */
                                $(".portfolio-data").remove();
                                $(".portfolio-add").remove();
                                portfolioHttp("http://localhost:8000");
                            }
                        }
                        reqPOST.open("PUT", "http://localhost:8000/portfolios/" + portfolioObj.id + "/", true);
                        reqPOST.setRequestHeader("X-CSRFToken", readCookie("csrftoken"));
                        reqPOST.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                        reqPOST.send(jsonData);
                        edit.html("SAVING...");
                    });
                });


                // DELETE BUTTON
                var dataDelete = $("<td></td>", {"class" : "data-button"});
                rowPortfolio.append(dataDelete);
                var del = $("<button></button>", {"class" : "table-button delete"});
                dataDelete.append(del);
                del.html("DELETE");

                del.click(function() {
                    del.addClass("delete-sure");
                    del.html("SURE?");
                    del.click(function() {
                        var reqDel = new XMLHttpRequest();
                        reqDel.onreadystatechange = function() {
                            if (this.readyState == 4) { /*  && this.status == 200 */
                                /* var res = JSON.parse(reqDel.responseText);
                                console.log(res); */
                                $(".portfolio-data").remove();
                                portfolioHttp("http://localhost:8000");
                            }
                        }
                        reqDel.open("DELETE", "http://localhost:8000/portfolios/" + portfolioObj.id + "/", true);
                        reqDel.setRequestHeader("X-CSRFToken", readCookie("csrftoken"));
                        reqDel.send();
                    });
                });
            });

            // ADD BUTTON
            var rowAdd = $("<tr></tr>", {"class" : "portfolio-add"});
            $(".portfolio-table").append(rowAdd);
            rowAdd.append($("<td></td>")); //Id

            //Ticker
            var dataTicker = $("<td></td>", {"class" : "table-input"});
            var inputAddTicker = $("<input>", {"type" : "text", "class" : "ticker"});
            dataTicker.append(inputAddTicker);
            rowAdd.append(dataTicker);

            //Name
            var dataName = $("<td></td>", {"class" : "table-input"});
            var inputAddName = $("<input>", {"type" : "text", "class" : "name"});
            rowAdd.append(dataName.append(inputAddName));

            //Amount
            var dataAmount = $("<td></td>", {"class" : "table-input"});
            var inputAddAmount = $("<input>", {"type" : "text", "class" : "name"});
            rowAdd.append(dataAmount.append(inputAddAmount));

            var dataPlatform = $("<td></td>");
            rowAdd.append(dataPlatform); //Platform
            rowAdd.append($("<td></td>")); //Owner
            rowAdd.append($("<td></td>")); //Url

            //Add button
            var dataSave = $("<td></td>", {"class" : "data-button", "colspan" : "2"});
            var sav = $("<button></button>", {"class" : "table-button save"});
            rowAdd.append(dataSave.append(sav));
            sav.html("ADD");
            sav.click(function() {
                var json = new Object();

                json.ticker = inputAddTicker.val();
                json.name = inputAddName.val();
                json.amount = inputAddAmount.val();
                json.platform = dataPlatform.text();

                var jsonData = JSON.stringify(json);
                var reqPOST = new XMLHttpRequest();
                reqPOST.onreadystatechange = function() {
                    if (this.readyState == 4) { /*  && this.status == 200 */
                        var res = JSON.parse(reqPOST.responseText);
                        console.log(res);
                        $(".portfolio-data").remove();
                        $(".portfolio-add").remove();
                        portfolioHttp("http://localhost:8000");
                    }
                }
                reqPOST.open("POST", "http://localhost:8000/portfolios/", true);
                reqPOST.setRequestHeader("X-CSRFToken", readCookie("csrftoken"));
                reqPOST.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                reqPOST.send(jsonData);
                sav.html("ADDING..");
            });
        }
    }
    request.open("GET", "http://localhost:8000/portfolios/", true);
    request.send();
}

function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}
