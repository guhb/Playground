/****************************************************************************
**
** Copyright (C) 2011 Nokia Corporation and/or its subsidiary(-ies).
** All rights reserved.
** Contact: Nokia Corporation (qt-info@nokia.com)
**
** This file is part of the QtDeclarative module of the Qt Toolkit.
**
** $QT_BEGIN_LICENSE:LGPL$
** GNU Lesser General Public License Usage
** This file may be used under the terms of the GNU Lesser General Public
** License version 2.1 as published by the Free Software Foundation and
** appearing in the file LICENSE.LGPL included in the packaging of this
** file. Please review the following information to ensure the GNU Lesser
** General Public License version 2.1 requirements will be met:
** http://www.gnu.org/licenses/old-licenses/lgpl-2.1.html.
**
** In addition, as a special exception, Nokia gives you certain additional
** rights. These rights are described in the Nokia Qt LGPL Exception
** version 1.1, included in the file LGPL_EXCEPTION.txt in this package.
**
** GNU General Public License Usage
** Alternatively, this file may be used under the terms of the GNU General
** Public License version 3.0 as published by the Free Software Foundation
** and appearing in the file LICENSE.GPL included in the packaging of this
** file. Please review the following information to ensure the GNU General
** Public License version 3.0 requirements will be met:
** http://www.gnu.org/copyleft/gpl.html.
**
** Other Usage
** Alternatively, this file may be used in accordance with the terms and
** conditions contained in a signed written agreement between you and Nokia.
**
**
**
**
**
** $QT_END_LICENSE$
**
****************************************************************************/

import QtQuick 1.0
import "js/util.js" as Util

Item {
    id: delegate
    height: column.height + 40
    width: delegate.ListView.view.width
    property string url: link

    Column {
        id: column
        x: 20; y: 20
        width: parent.width - 40

        Text {
            id: titleText
            text: title; width: parent.width; wrapMode: Text.WordWrap
            font { bold: true; family: "Helvetica"; pointSize: 16 }
        }

        Text {
            id: descriptionText
            width: parent.width; text: description
            wrapMode: Text.WordWrap; font.family: "Helvetica"
        }
    }
    MouseArea {
        anchors.fill: parent
        /*onClicked: {
            console.log("New url: " + url)
            content.url = url
        }*/
        onClicked: {
            console.log("New url: " + url)
            var doc = new XMLHttpRequest();
            doc.onreadystatechange = function() {
                if (doc.readyState == XMLHttpRequest.HEADERS_RECEIVED) {
                    /*showRequestInfo("Headers -->");
                    showRequestInfo(doc.getAllResponseHeaders ());
                    showRequestInfo("Last modified -->");
                    showRequestInfo(doc.getResponseHeader ("Last-Modified"));*/

                } else if (doc.readyState == XMLHttpRequest.DONE) {
                    //var a = doc.responseXML.documentElement;
                    //for (var ii = 0; ii < a.childNodes.length; ++ii) {
                    //    console.log(a.childNodes[ii].nodeName);
                    //}
                    console.log("Headers -->");
                    console.log(doc.getAllResponseHeaders ());
                    console.log("Last modified -->");
                    console.log(doc.getResponseHeader ("Last-Modified"));
                    //console.log(doc.responseText);
                    var text = new RegExp('<div class="yog-wrap yom-art-bd"(.*?)</div>', "g");
                    <div class="yog-wrap yom-art-bd" id="yui_3_5_1_21_1344509795419_260">
                        <div class="yog-col yog-5u">


                    <!-- yog-5u --></div>
                        <div class="yog-col yog-11u" id="yui_3_5_1_21_1344509795419_259">
                    <div class="yom-mod yom-art-content " id="yui_3_5_1_21_1344509795419_258"><div class="bd" id="yui_3_5_1_21_1344509795419_257"><p class="first" id="yui_3_5_1_21_1344509795419_263">BEIRUT (Reuters) - A former <span class="yshortcuts cs4-visible" id="lw_1344508384_1">Lebanese government minister</span> with close ties to <span class="yshortcuts cs4-visible" id="lw_1344508384_3">Syrian President Bashar al-Assad</span> was detained in <span class="yshortcuts cs4-visible" id="lw_1344508384_5">Lebanon</span> on Thursday for questioning over what the <span class="yshortcuts cs4-visible" id="lw_1344508384_4">Lebanese prime minister</span> described as security-related matters.</p>
                    <p id="yui_3_5_1_21_1344509795419_256">              A security source said <span class="yshortcuts cs4-visible" id="lw_1344508384_0">Michel Samaha</span>, detained in the early hours, was being questioned about alleged plans to cause instability in Lebanon.</p>
                    <p id="yui_3_5_1_21_1344509795419_265">              <span class="yshortcuts cs4-ndcor" id="lw_1344508384_6">Elias Aoun</span>, head of the Lebanese journalists' union, said <span class="yshortcuts cs4-visible" id="lw_1344508384_2">Prime Minister Najib Mikati</span> had told him Samaha had been held following an order from the acting public prosecutor.</p>
                    <p>              Samaha has been an outspoken supporter of Assad during the 17-month-old uprising against his rule, echoing an official Syrian narrative that portrays the opposition as terrorists.</p>
                    <p id="yui_3_5_1_21_1344509795419_366">              He served as a minister in three Lebanese governments between 1992 and 2004 - a period when Syria dominated politics and security in its smaller neighbor. Samaha is also a former member of parliament.</p>
                    <p id="yui_3_5_1_21_1344509795419_364">              In 2007, he was named on a White House-issued list of Lebanese and Syrian figures suspected of working to undermine Lebanon's stability and the Western-backed government in office at the time.</p>
                    <p id="yui_3_5_1_21_1344509795419_362">              The list also included Assef Shawkat, a senior Syrian security official and Assad's brother-in-law, who was killed in a bomb blast in Damascus last month.</p>
                    <p id="yui_3_5_1_21_1344509795419_360">              Further details on Samaha's detention were not immediately available. Live television footage showed members of the security forces searching his house.</p>
                    <p id="yui_3_5_1_21_1344509795419_358">              (Writing by Tom Perry; Editing by Alistair Lyon)</p>
                    </div></div>


                    <div class="yom-mod yom-follow" id="mediasocialfollow"><div class="bd" id="yui_3_5_1_21_1344509795419_402"><iframe src="http://platform.twitter.com/widgets/follow_button.html?screen_name=yahoonews&amp;show_count=false&amp;show_screen_name=false&amp;width=61&amp;height=22&amp;lang=en" frameborder="0" scrolling="no" style="width:61px;height:22px;" allowtransparency="true"></iframe><a href="http://twitter.com/intent/user?region=screen_name&amp;screen_name=yahoonews" onclick="window.open(this.href, &quot;share&quot;, &quot;width=550, height=450, scrollbars=no, menubar=no, resizable=no, location=yes, toolbar=no&quot;); return false;" target="_blank" rel="nofollow" title="Follow @yahoonews on Twitter">@yahoonews</a> on Twitter, become a fan on <a href="http://www.facebook.com/yahoonews" target="_blank" rel="nofollow">Facebook</a> <iframe src="http://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.facebook.com%2Fyahoonews&amp;layout=button_count&amp;show_faces=0&amp;width=90&amp;height=24&amp;locale=en_US" frameborder="0" scrolling="no" style="width:90px;height:24px;" allowtransparency="true"></iframe></div></div>
                    <!-- yog-llu --></div>
                    </div>
                    var t = doc.responseText.match(text);
                    console.log(t);
                    content.text = doc.responseText;
                }
            }

            doc.open("GET", url);
            doc.send();
            console.log("New url: " + url)
        }
    }

    Rectangle {
        width: parent.width; height: 1; color: "#cccccc"
        anchors.bottom: parent.bottom
    }
}
