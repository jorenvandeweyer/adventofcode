const input = `#1 @ 249,597: 20x15
#2 @ 192,174: 10x21
#3 @ 734,527: 23x10
#4 @ 165,232: 27x27
#5 @ 834,22: 17x12
#6 @ 558,963: 18x26
#7 @ 88,870: 13x10
#8 @ 877,380: 20x13
#9 @ 431,810: 12x22
#10 @ 359,82: 26x23
#11 @ 466,394: 24x26
#12 @ 90,393: 24x17
#13 @ 166,192: 14x17
#14 @ 939,687: 11x27
#15 @ 491,18: 11x18
#16 @ 124,106: 16x22
#17 @ 595,627: 17x20
#18 @ 596,781: 27x28
#19 @ 458,527: 24x10
#20 @ 615,401: 11x8
#21 @ 724,287: 15x24
#22 @ 274,692: 18x14
#23 @ 557,102: 28x13
#24 @ 797,403: 29x10
#25 @ 473,655: 12x29
#26 @ 300,959: 19x24
#27 @ 416,724: 26x29
#28 @ 684,176: 28x19
#29 @ 296,109: 10x14
#30 @ 148,191: 19x24
#31 @ 878,716: 10x29
#32 @ 951,234: 25x29
#33 @ 111,385: 13x22
#34 @ 224,716: 11x16
#35 @ 919,236: 20x15
#36 @ 202,499: 15x11
#37 @ 790,13: 11x24
#38 @ 229,891: 12x19
#39 @ 717,434: 17x26
#40 @ 294,642: 10x15
#41 @ 427,693: 18x21
#42 @ 125,763: 13x18
#43 @ 122,217: 14x14
#44 @ 274,253: 27x25
#45 @ 613,19: 21x23
#46 @ 57,45: 14x12
#47 @ 324,512: 28x19
#48 @ 966,949: 24x18
#49 @ 214,149: 17x15
#50 @ 261,636: 22x10
#51 @ 882,809: 28x27
#52 @ 610,801: 16x11
#53 @ 830,568: 12x3
#54 @ 228,904: 16x11
#55 @ 798,573: 17x22
#56 @ 338,652: 27x13
#57 @ 71,514: 28x20
#58 @ 302,337: 16x11
#59 @ 619,348: 11x10
#60 @ 198,655: 13x18
#61 @ 565,857: 29x27
#62 @ 758,353: 15x16
#63 @ 923,531: 19x15
#64 @ 475,180: 17x20
#65 @ 418,943: 25x16
#66 @ 304,194: 10x21
#67 @ 213,505: 24x13
#68 @ 240,345: 19x29
#69 @ 261,356: 18x21
#70 @ 304,572: 12x18
#71 @ 234,57: 12x19
#72 @ 896,417: 14x23
#73 @ 218,940: 19x26
#74 @ 610,129: 13x22
#75 @ 836,802: 23x15
#76 @ 781,268: 26x28
#77 @ 183,230: 23x27
#78 @ 213,223: 18x3
#79 @ 591,931: 16x21
#80 @ 940,333: 12x25
#81 @ 205,618: 26x13
#82 @ 173,277: 15x19
#83 @ 259,601: 22x13
#84 @ 10,581: 26x12
#85 @ 229,161: 13x11
#86 @ 321,581: 11x17
#87 @ 111,508: 18x23
#88 @ 191,572: 17x12
#89 @ 134,796: 22x12
#90 @ 977,643: 3x5
#91 @ 387,574: 27x24
#92 @ 634,152: 21x18
#93 @ 69,265: 15x25
#94 @ 111,386: 10x29
#95 @ 239,943: 29x13
#96 @ 604,606: 24x24
#97 @ 33,419: 23x29
#98 @ 752,736: 26x12
#99 @ 646,46: 11x21
#100 @ 140,61: 20x18
#101 @ 960,105: 21x28
#102 @ 933,885: 13x21
#103 @ 53,51: 13x21
#104 @ 776,5: 15x17
#105 @ 440,907: 28x19
#106 @ 268,315: 17x17
#107 @ 150,176: 18x22
#108 @ 555,336: 13x29
#109 @ 552,307: 29x22
#110 @ 193,190: 18x27
#111 @ 531,33: 22x28
#112 @ 786,516: 26x19
#113 @ 61,480: 22x24
#114 @ 117,675: 28x16
#115 @ 5,151: 10x18
#116 @ 700,74: 10x25
#117 @ 315,641: 24x16
#118 @ 273,805: 12x25
#119 @ 924,526: 24x12
#120 @ 58,79: 29x21
#121 @ 624,191: 20x23
#122 @ 180,432: 26x27
#123 @ 275,205: 16x21
#124 @ 726,980: 11x16
#125 @ 154,198: 14x23
#126 @ 152,192: 15x15
#127 @ 820,541: 17x26
#128 @ 896,173: 28x29
#129 @ 769,608: 25x13
#130 @ 736,263: 22x13
#131 @ 521,597: 16x12
#132 @ 121,477: 15x18
#133 @ 143,34: 15x12
#134 @ 208,715: 16x18
#135 @ 557,521: 23x14
#136 @ 274,814: 27x11
#137 @ 154,542: 14x19
#138 @ 588,902: 28x15
#139 @ 322,351: 28x25
#140 @ 156,799: 27x28
#141 @ 635,324: 21x22
#142 @ 488,564: 13x25
#143 @ 763,882: 27x16
#144 @ 9,718: 16x22
#145 @ 145,772: 14x22
#146 @ 108,396: 15x24
#147 @ 417,826: 15x16
#148 @ 366,36: 15x13
#149 @ 106,961: 19x22
#150 @ 810,224: 18x28
#151 @ 30,456: 12x22
#152 @ 974,636: 12x21
#153 @ 114,104: 14x12
#154 @ 114,183: 29x23
#155 @ 514,13: 18x14
#156 @ 64,571: 11x25
#157 @ 774,276: 15x19
#158 @ 950,229: 28x29
#159 @ 722,154: 20x20
#160 @ 30,575: 16x24
#161 @ 802,607: 28x23
#162 @ 425,944: 23x11
#163 @ 226,945: 25x20
#164 @ 218,194: 12x12
#165 @ 880,386: 5x9
#166 @ 46,593: 14x10
#167 @ 550,746: 13x20
#168 @ 592,328: 22x22
#169 @ 131,608: 29x21
#170 @ 371,248: 22x24
#171 @ 159,177: 23x23
#172 @ 274,409: 16x23
#173 @ 301,577: 11x15
#174 @ 130,167: 16x20
#175 @ 301,814: 18x11
#176 @ 893,413: 24x15
#177 @ 266,316: 23x17
#178 @ 860,491: 24x29
#179 @ 708,737: 24x20
#180 @ 625,250: 16x25
#181 @ 902,420: 27x25
#182 @ 152,76: 14x19
#183 @ 492,166: 8x14
#184 @ 182,367: 17x21
#185 @ 226,605: 28x16
#186 @ 544,365: 20x27
#187 @ 69,672: 24x26
#188 @ 354,775: 29x15
#189 @ 821,715: 10x27
#190 @ 763,436: 27x18
#191 @ 259,273: 9x11
#192 @ 562,554: 19x27
#193 @ 571,770: 14x23
#194 @ 593,81: 11x5
#195 @ 59,187: 16x15
#196 @ 235,69: 18x23
#197 @ 381,34: 11x23
#198 @ 58,621: 25x15
#199 @ 812,985: 25x10
#200 @ 146,657: 18x24
#201 @ 144,132: 25x22
#202 @ 570,791: 12x15
#203 @ 663,490: 24x12
#204 @ 642,180: 16x22
#205 @ 124,293: 12x27
#206 @ 815,137: 28x18
#207 @ 16,880: 27x28
#208 @ 230,365: 28x22
#209 @ 230,782: 14x13
#210 @ 969,108: 5x15
#211 @ 862,726: 23x27
#212 @ 858,135: 23x10
#213 @ 853,588: 12x24
#214 @ 430,311: 26x16
#215 @ 814,207: 29x29
#216 @ 618,653: 14x25
#217 @ 664,101: 16x23
#218 @ 703,285: 27x23
#219 @ 825,438: 23x16
#220 @ 265,725: 27x20
#221 @ 18,561: 28x24
#222 @ 469,252: 17x11
#223 @ 388,520: 29x16
#224 @ 382,492: 15x29
#225 @ 452,449: 26x13
#226 @ 72,803: 23x17
#227 @ 652,84: 7x15
#228 @ 27,205: 20x25
#229 @ 330,74: 19x17
#230 @ 805,24: 25x14
#231 @ 405,578: 18x21
#232 @ 242,393: 27x26
#233 @ 216,606: 22x11
#234 @ 734,870: 18x14
#235 @ 780,737: 14x27
#236 @ 154,502: 4x10
#237 @ 912,536: 22x13
#238 @ 365,413: 19x10
#239 @ 85,859: 11x12
#240 @ 973,708: 27x14
#241 @ 193,149: 29x26
#242 @ 958,418: 14x28
#243 @ 818,875: 19x14
#244 @ 345,0: 10x21
#245 @ 641,182: 26x17
#246 @ 694,276: 26x14
#247 @ 563,413: 12x16
#248 @ 303,702: 24x27
#249 @ 131,145: 17x24
#250 @ 298,135: 19x27
#251 @ 87,306: 10x14
#252 @ 178,180: 11x15
#253 @ 39,587: 25x15
#254 @ 391,61: 27x28
#255 @ 840,758: 13x14
#256 @ 406,714: 12x25
#257 @ 385,184: 16x23
#258 @ 448,913: 26x26
#259 @ 847,117: 26x22
#260 @ 956,371: 12x24
#261 @ 600,964: 29x11
#262 @ 217,519: 20x24
#263 @ 75,805: 4x12
#264 @ 137,452: 10x15
#265 @ 406,299: 24x14
#266 @ 48,871: 23x14
#267 @ 571,234: 23x24
#268 @ 134,745: 28x27
#269 @ 739,155: 28x25
#270 @ 349,784: 12x25
#271 @ 653,953: 14x21
#272 @ 122,561: 19x11
#273 @ 195,373: 18x29
#274 @ 290,90: 22x23
#275 @ 829,493: 27x18
#276 @ 929,536: 13x13
#277 @ 82,23: 23x27
#278 @ 53,846: 21x10
#279 @ 365,656: 13x16
#280 @ 274,79: 21x17
#281 @ 535,193: 16x27
#282 @ 969,552: 16x27
#283 @ 278,116: 29x12
#284 @ 111,173: 21x23
#285 @ 3,568: 17x10
#286 @ 425,567: 17x21
#287 @ 447,436: 27x20
#288 @ 8,129: 20x15
#289 @ 477,133: 14x10
#290 @ 261,948: 6x4
#291 @ 339,833: 19x15
#292 @ 596,665: 20x12
#293 @ 638,255: 16x13
#294 @ 488,164: 19x20
#295 @ 761,106: 17x23
#296 @ 799,25: 27x13
#297 @ 277,172: 23x28
#298 @ 1,555: 23x28
#299 @ 262,141: 10x25
#300 @ 530,231: 11x17
#301 @ 311,587: 13x11
#302 @ 95,343: 13x14
#303 @ 27,755: 27x26
#304 @ 63,605: 20x24
#305 @ 502,678: 22x25
#306 @ 963,451: 13x11
#307 @ 391,346: 13x24
#308 @ 299,192: 15x19
#309 @ 330,9: 23x22
#310 @ 111,351: 10x10
#311 @ 204,7: 16x12
#312 @ 646,296: 11x14
#313 @ 273,744: 14x15
#314 @ 229,296: 17x21
#315 @ 644,214: 29x11
#316 @ 799,403: 29x14
#317 @ 565,794: 24x19
#318 @ 91,348: 23x24
#319 @ 557,164: 24x29
#320 @ 146,533: 16x25
#321 @ 629,963: 13x15
#322 @ 710,385: 20x10
#323 @ 420,832: 18x17
#324 @ 24,400: 24x26
#325 @ 662,52: 17x18
#326 @ 826,550: 21x11
#327 @ 172,790: 14x24
#328 @ 41,534: 19x26
#329 @ 450,277: 26x26
#330 @ 770,624: 19x11
#331 @ 871,936: 10x20
#332 @ 824,265: 21x10
#333 @ 297,88: 13x19
#334 @ 18,538: 13x16
#335 @ 289,182: 20x25
#336 @ 722,234: 14x18
#337 @ 673,405: 29x27
#338 @ 816,348: 27x29
#339 @ 398,52: 17x14
#340 @ 146,893: 18x20
#341 @ 241,552: 24x21
#342 @ 728,388: 14x23
#343 @ 81,250: 18x16
#344 @ 654,501: 19x19
#345 @ 349,422: 19x24
#346 @ 66,39: 19x15
#347 @ 560,238: 21x14
#348 @ 753,434: 17x10
#349 @ 191,199: 18x16
#350 @ 131,188: 28x16
#351 @ 582,356: 18x19
#352 @ 324,92: 15x10
#353 @ 955,256: 11x29
#354 @ 920,449: 17x16
#355 @ 308,357: 11x19
#356 @ 827,903: 19x27
#357 @ 447,158: 16x11
#358 @ 361,749: 25x25
#359 @ 159,649: 22x26
#360 @ 197,732: 22x13
#361 @ 858,889: 13x19
#362 @ 869,800: 25x11
#363 @ 967,687: 29x29
#364 @ 219,404: 14x22
#365 @ 878,735: 28x16
#366 @ 848,374: 12x19
#367 @ 521,523: 24x24
#368 @ 147,893: 17x12
#369 @ 84,157: 21x20
#370 @ 369,135: 21x17
#371 @ 262,138: 16x20
#372 @ 402,930: 21x29
#373 @ 306,90: 27x24
#374 @ 256,622: 3x5
#375 @ 250,875: 23x23
#376 @ 925,694: 12x16
#377 @ 169,167: 23x16
#378 @ 876,448: 28x17
#379 @ 924,284: 25x29
#380 @ 598,253: 13x18
#381 @ 198,248: 21x27
#382 @ 638,842: 22x24
#383 @ 398,733: 19x27
#384 @ 542,56: 14x12
#385 @ 257,424: 14x10
#386 @ 308,337: 22x27
#387 @ 504,448: 14x16
#388 @ 456,922: 29x21
#389 @ 155,88: 20x24
#390 @ 9,706: 25x24
#391 @ 645,357: 28x15
#392 @ 34,699: 12x22
#393 @ 851,621: 10x17
#394 @ 653,854: 21x11
#395 @ 294,736: 13x23
#396 @ 407,573: 26x17
#397 @ 823,418: 19x24
#398 @ 315,365: 15x16
#399 @ 282,185: 26x14
#400 @ 602,907: 22x20
#401 @ 336,783: 26x17
#402 @ 546,328: 15x11
#403 @ 848,488: 29x20
#404 @ 6,499: 12x23
#405 @ 861,629: 22x24
#406 @ 28,209: 25x28
#407 @ 221,738: 23x20
#408 @ 306,758: 19x28
#409 @ 154,521: 21x24
#410 @ 830,269: 18x18
#411 @ 594,905: 28x13
#412 @ 261,810: 24x26
#413 @ 633,40: 16x12
#414 @ 326,351: 10x22
#415 @ 261,912: 23x21
#416 @ 882,470: 20x18
#417 @ 774,31: 29x10
#418 @ 809,921: 25x21
#419 @ 840,537: 10x21
#420 @ 737,802: 21x29
#421 @ 539,976: 29x19
#422 @ 611,124: 23x13
#423 @ 70,592: 26x29
#424 @ 617,965: 11x11
#425 @ 799,32: 18x23
#426 @ 281,725: 13x20
#427 @ 959,678: 29x15
#428 @ 862,874: 22x29
#429 @ 759,667: 22x24
#430 @ 66,400: 10x10
#431 @ 126,242: 21x18
#432 @ 835,385: 27x21
#433 @ 343,737: 10x20
#434 @ 970,280: 29x28
#435 @ 386,889: 17x16
#436 @ 302,356: 14x25
#437 @ 8,513: 27x13
#438 @ 75,364: 20x20
#439 @ 970,336: 16x20
#440 @ 440,63: 29x22
#441 @ 795,752: 14x25
#442 @ 331,787: 26x19
#443 @ 378,53: 23x11
#444 @ 444,840: 16x7
#445 @ 806,89: 21x29
#446 @ 236,496: 29x10
#447 @ 879,556: 17x15
#448 @ 631,800: 14x23
#449 @ 540,388: 14x12
#450 @ 859,629: 22x28
#451 @ 103,348: 15x27
#452 @ 310,22: 22x12
#453 @ 542,99: 23x22
#454 @ 63,505: 29x15
#455 @ 333,479: 23x23
#456 @ 60,132: 22x24
#457 @ 297,220: 27x22
#458 @ 331,560: 10x25
#459 @ 583,665: 17x29
#460 @ 512,786: 14x20
#461 @ 962,432: 11x10
#462 @ 951,374: 14x22
#463 @ 169,275: 29x20
#464 @ 428,624: 19x26
#465 @ 145,203: 29x29
#466 @ 96,211: 29x21
#467 @ 211,921: 15x12
#468 @ 520,787: 11x10
#469 @ 710,330: 17x17
#470 @ 248,403: 10x29
#471 @ 393,900: 16x26
#472 @ 949,206: 22x27
#473 @ 170,348: 13x12
#474 @ 878,703: 20x10
#475 @ 488,481: 20x28
#476 @ 929,447: 13x23
#477 @ 246,389: 14x28
#478 @ 611,956: 28x11
#479 @ 397,934: 20x15
#480 @ 948,476: 25x25
#481 @ 184,760: 15x25
#482 @ 260,100: 22x23
#483 @ 577,336: 25x21
#484 @ 359,261: 19x10
#485 @ 876,803: 28x18
#486 @ 941,128: 19x20
#487 @ 248,378: 10x26
#488 @ 36,431: 19x29
#489 @ 742,561: 11x17
#490 @ 862,65: 19x19
#491 @ 252,102: 19x21
#492 @ 957,321: 28x21
#493 @ 331,444: 27x21
#494 @ 576,784: 20x21
#495 @ 597,487: 22x27
#496 @ 302,651: 20x15
#497 @ 392,749: 25x24
#498 @ 266,419: 14x26
#499 @ 201,959: 25x11
#500 @ 854,445: 29x15
#501 @ 514,580: 19x29
#502 @ 37,722: 13x29
#503 @ 206,567: 18x13
#504 @ 822,346: 18x29
#505 @ 738,329: 17x21
#506 @ 834,365: 14x14
#507 @ 826,877: 15x18
#508 @ 23,271: 23x16
#509 @ 12,534: 27x20
#510 @ 568,232: 14x22
#511 @ 939,816: 25x16
#512 @ 464,603: 11x17
#513 @ 28,274: 14x11
#514 @ 801,204: 29x23
#515 @ 837,542: 18x22
#516 @ 469,909: 20x10
#517 @ 666,396: 21x10
#518 @ 615,698: 25x11
#519 @ 606,351: 16x11
#520 @ 937,408: 26x21
#521 @ 207,244: 14x24
#522 @ 772,697: 10x15
#523 @ 350,762: 29x19
#524 @ 344,417: 15x15
#525 @ 286,192: 23x20
#526 @ 359,764: 15x16
#527 @ 456,857: 25x28
#528 @ 828,654: 20x23
#529 @ 768,802: 27x24
#530 @ 523,917: 26x13
#531 @ 371,30: 18x11
#532 @ 11,281: 20x15
#533 @ 805,924: 29x11
#534 @ 25,196: 29x20
#535 @ 562,588: 13x18
#536 @ 385,738: 22x24
#537 @ 139,38: 10x12
#538 @ 436,546: 24x15
#539 @ 300,335: 22x28
#540 @ 361,676: 24x20
#541 @ 742,427: 16x29
#542 @ 814,217: 25x26
#543 @ 859,36: 15x14
#544 @ 323,238: 19x12
#545 @ 661,60: 21x28
#546 @ 236,394: 22x12
#547 @ 337,14: 14x17
#548 @ 917,686: 12x14
#549 @ 927,130: 26x19
#550 @ 125,672: 18x22
#551 @ 516,687: 19x16
#552 @ 664,519: 18x13
#553 @ 255,99: 16x12
#554 @ 461,281: 23x21
#555 @ 684,676: 20x15
#556 @ 258,731: 28x12
#557 @ 847,983: 21x13
#558 @ 984,318: 11x14
#559 @ 439,923: 5x5
#560 @ 178,330: 20x20
#561 @ 962,946: 18x24
#562 @ 649,813: 12x26
#563 @ 16,252: 27x24
#564 @ 13,942: 12x25
#565 @ 189,484: 13x11
#566 @ 959,104: 20x23
#567 @ 300,246: 19x25
#568 @ 840,258: 14x16
#569 @ 754,738: 10x7
#570 @ 878,921: 23x18
#571 @ 417,540: 14x12
#572 @ 232,661: 27x12
#573 @ 554,758: 12x17
#574 @ 955,173: 16x18
#575 @ 438,579: 21x11
#576 @ 571,740: 24x29
#577 @ 218,912: 16x25
#578 @ 667,63: 25x18
#579 @ 683,642: 16x24
#580 @ 308,115: 14x28
#581 @ 419,4: 27x26
#582 @ 812,249: 29x29
#583 @ 818,442: 16x19
#584 @ 453,136: 27x27
#585 @ 17,202: 15x23
#586 @ 65,834: 24x19
#587 @ 810,752: 28x22
#588 @ 54,892: 14x20
#589 @ 372,134: 11x17
#590 @ 203,845: 19x15
#591 @ 109,491: 26x13
#592 @ 118,7: 19x22
#593 @ 871,113: 21x25
#594 @ 52,311: 24x23
#595 @ 254,222: 25x24
#596 @ 787,893: 24x11
#597 @ 442,435: 20x19
#598 @ 586,439: 14x17
#599 @ 37,114: 20x17
#600 @ 108,168: 19x25
#601 @ 146,187: 14x16
#602 @ 201,576: 17x23
#603 @ 387,759: 21x11
#604 @ 861,520: 10x20
#605 @ 834,801: 16x14
#606 @ 909,568: 13x21
#607 @ 111,947: 27x21
#608 @ 326,584: 13x26
#609 @ 312,235: 25x17
#610 @ 734,267: 17x21
#611 @ 168,259: 14x21
#612 @ 753,541: 20x17
#613 @ 83,879: 20x13
#614 @ 778,695: 20x20
#615 @ 601,859: 29x14
#616 @ 48,115: 12x18
#617 @ 472,455: 11x25
#618 @ 436,918: 12x15
#619 @ 118,655: 17x29
#620 @ 375,418: 13x14
#621 @ 32,503: 14x24
#622 @ 562,463: 13x20
#623 @ 883,444: 10x28
#624 @ 948,256: 26x15
#625 @ 710,715: 14x19
#626 @ 86,858: 26x22
#627 @ 211,220: 24x16
#628 @ 159,626: 17x29
#629 @ 747,9: 22x10
#630 @ 203,254: 22x27
#631 @ 52,677: 12x29
#632 @ 233,163: 3x5
#633 @ 880,694: 16x28
#634 @ 778,65: 3x7
#635 @ 608,625: 21x12
#636 @ 198,350: 29x25
#637 @ 428,836: 29x21
#638 @ 39,778: 16x26
#639 @ 234,106: 17x16
#640 @ 130,453: 17x12
#641 @ 51,602: 29x26
#642 @ 425,545: 16x26
#643 @ 553,554: 29x12
#644 @ 822,108: 19x20
#645 @ 472,260: 27x18
#646 @ 731,173: 17x21
#647 @ 532,360: 12x22
#648 @ 583,801: 13x19
#649 @ 558,595: 20x16
#650 @ 226,895: 11x28
#651 @ 956,243: 12x20
#652 @ 156,596: 14x14
#653 @ 426,189: 21x10
#654 @ 425,45: 25x17
#655 @ 461,715: 19x21
#656 @ 659,925: 13x17
#657 @ 312,762: 21x24
#658 @ 868,50: 15x24
#659 @ 388,168: 15x17
#660 @ 945,704: 20x29
#661 @ 587,761: 12x22
#662 @ 182,816: 27x22
#663 @ 251,226: 22x14
#664 @ 609,160: 24x26
#665 @ 437,877: 11x11
#666 @ 41,261: 23x14
#667 @ 977,31: 10x29
#668 @ 22,180: 13x11
#669 @ 830,797: 12x15
#670 @ 785,441: 15x26
#671 @ 647,247: 12x27
#672 @ 447,594: 23x10
#673 @ 817,607: 26x19
#674 @ 627,862: 20x10
#675 @ 391,43: 16x29
#676 @ 601,955: 12x26
#677 @ 748,870: 16x11
#678 @ 857,484: 16x22
#679 @ 953,719: 19x23
#680 @ 525,922: 19x4
#681 @ 689,525: 18x23
#682 @ 462,97: 26x13
#683 @ 138,670: 13x19
#684 @ 750,114: 20x27
#685 @ 492,311: 11x21
#686 @ 624,497: 24x13
#687 @ 754,432: 15x19
#688 @ 201,563: 10x17
#689 @ 581,106: 10x26
#690 @ 300,936: 21x19
#691 @ 558,409: 27x10
#692 @ 105,467: 13x14
#693 @ 57,178: 12x10
#694 @ 585,440: 23x14
#695 @ 204,664: 24x18
#696 @ 350,922: 26x20
#697 @ 40,909: 26x17
#698 @ 253,619: 10x13
#699 @ 811,485: 16x22
#700 @ 373,26: 16x22
#701 @ 461,667: 25x10
#702 @ 313,408: 27x16
#703 @ 787,464: 28x27
#704 @ 970,481: 25x10
#705 @ 383,758: 17x20
#706 @ 848,310: 19x26
#707 @ 384,23: 21x10
#708 @ 797,288: 11x23
#709 @ 35,794: 11x14
#710 @ 264,207: 18x22
#711 @ 214,606: 20x15
#712 @ 347,339: 28x15
#713 @ 421,766: 13x25
#714 @ 837,583: 13x15
#715 @ 89,28: 13x15
#716 @ 150,793: 21x17
#717 @ 455,451: 19x22
#718 @ 461,371: 26x28
#719 @ 99,261: 15x13
#720 @ 815,402: 10x17
#721 @ 298,936: 14x22
#722 @ 938,748: 26x27
#723 @ 557,263: 29x10
#724 @ 611,746: 11x22
#725 @ 0,437: 28x25
#726 @ 466,697: 10x29
#727 @ 656,115: 21x23
#728 @ 865,971: 23x26
#729 @ 943,740: 11x27
#730 @ 581,751: 22x25
#731 @ 810,205: 12x10
#732 @ 178,76: 14x14
#733 @ 335,593: 12x24
#734 @ 194,559: 10x19
#735 @ 186,63: 14x22
#736 @ 227,591: 15x17
#737 @ 730,751: 12x18
#738 @ 679,497: 18x29
#739 @ 792,15: 6x19
#740 @ 229,313: 7x10
#741 @ 802,209: 17x27
#742 @ 890,971: 14x13
#743 @ 551,256: 18x17
#744 @ 206,745: 19x16
#745 @ 299,954: 14x17
#746 @ 217,573: 13x11
#747 @ 919,305: 27x22
#748 @ 530,33: 28x27
#749 @ 703,373: 29x29
#750 @ 149,142: 27x21
#751 @ 721,285: 12x15
#752 @ 389,7: 25x26
#753 @ 812,241: 24x21
#754 @ 450,144: 14x16
#755 @ 647,895: 15x25
#756 @ 556,173: 24x27
#757 @ 159,261: 23x22
#758 @ 33,455: 12x13
#759 @ 338,325: 14x15
#760 @ 567,77: 13x22
#761 @ 339,821: 29x11
#762 @ 328,488: 4x3
#763 @ 14,180: 11x27
#764 @ 274,254: 27x21
#765 @ 796,747: 17x23
#766 @ 528,451: 25x17
#767 @ 196,796: 10x21
#768 @ 48,391: 12x19
#769 @ 644,484: 11x14
#770 @ 293,777: 19x22
#771 @ 657,82: 28x20
#772 @ 734,962: 22x25
#773 @ 455,95: 13x14
#774 @ 440,198: 27x28
#775 @ 581,742: 28x25
#776 @ 450,48: 13x17
#777 @ 956,246: 26x28
#778 @ 110,500: 14x19
#779 @ 666,908: 19x13
#780 @ 709,234: 21x13
#781 @ 98,814: 18x27
#782 @ 32,182: 27x28
#783 @ 519,457: 28x13
#784 @ 477,840: 29x18
#785 @ 826,564: 26x24
#786 @ 351,425: 13x17
#787 @ 311,927: 21x17
#788 @ 524,477: 22x15
#789 @ 257,267: 22x25
#790 @ 85,525: 19x18
#791 @ 364,586: 16x15
#792 @ 14,72: 15x25
#793 @ 877,378: 13x21
#794 @ 519,232: 18x17
#795 @ 15,570: 17x21
#796 @ 793,563: 25x20
#797 @ 823,758: 15x20
#798 @ 617,269: 11x16
#799 @ 430,930: 27x26
#800 @ 325,14: 18x26
#801 @ 28,883: 17x16
#802 @ 843,585: 15x16
#803 @ 572,673: 26x21
#804 @ 668,135: 28x19
#805 @ 309,31: 21x18
#806 @ 731,740: 24x22
#807 @ 776,59: 27x20
#808 @ 716,701: 22x28
#809 @ 685,811: 15x18
#810 @ 625,662: 12x25
#811 @ 447,684: 26x26
#812 @ 591,73: 17x25
#813 @ 853,307: 25x13
#814 @ 648,372: 14x23
#815 @ 282,967: 22x20
#816 @ 654,22: 25x21
#817 @ 151,498: 11x19
#818 @ 349,650: 12x28
#819 @ 841,129: 16x28
#820 @ 886,967: 14x10
#821 @ 127,54: 27x26
#822 @ 86,586: 20x11
#823 @ 553,304: 18x20
#824 @ 185,543: 16x26
#825 @ 251,363: 3x4
#826 @ 286,716: 23x25
#827 @ 617,344: 24x22
#828 @ 620,163: 9x5
#829 @ 535,476: 24x13
#830 @ 636,285: 26x19
#831 @ 929,321: 11x25
#832 @ 8,8: 14x28
#833 @ 243,614: 12x11
#834 @ 972,249: 11x16
#835 @ 296,268: 13x15
#836 @ 208,644: 29x23
#837 @ 859,385: 28x16
#838 @ 603,350: 29x20
#839 @ 442,827: 22x25
#840 @ 339,588: 20x19
#841 @ 310,81: 23x16
#842 @ 403,718: 16x16
#843 @ 315,771: 18x12
#844 @ 644,80: 29x15
#845 @ 573,80: 25x13
#846 @ 740,550: 16x20
#847 @ 127,437: 19x14
#848 @ 121,483: 11x26
#849 @ 471,603: 14x13
#850 @ 341,504: 18x21
#851 @ 983,308: 16x23
#852 @ 455,45: 24x29
#853 @ 13,12: 10x20
#854 @ 610,33: 26x23
#855 @ 427,6: 12x22
#856 @ 951,182: 12x14
#857 @ 564,245: 15x12
#858 @ 640,50: 27x18
#859 @ 46,915: 10x26
#860 @ 133,753: 21x28
#861 @ 590,251: 13x14
#862 @ 866,531: 26x13
#863 @ 560,408: 15x18
#864 @ 133,764: 15x28
#865 @ 395,455: 28x27
#866 @ 170,805: 14x18
#867 @ 216,253: 11x28
#868 @ 741,862: 21x17
#869 @ 342,832: 25x13
#870 @ 691,529: 13x3
#871 @ 93,372: 21x24
#872 @ 431,458: 29x12
#873 @ 242,650: 10x14
#874 @ 35,920: 12x10
#875 @ 804,300: 17x22
#876 @ 890,720: 16x23
#877 @ 219,136: 14x24
#878 @ 276,507: 21x13
#879 @ 670,847: 28x28
#880 @ 597,19: 18x27
#881 @ 326,483: 29x12
#882 @ 430,202: 15x18
#883 @ 124,204: 28x21
#884 @ 747,605: 28x19
#885 @ 379,926: 10x13
#886 @ 314,33: 27x11
#887 @ 622,964: 19x22
#888 @ 761,894: 13x19
#889 @ 241,772: 10x23
#890 @ 662,655: 28x26
#891 @ 805,290: 22x12
#892 @ 444,638: 22x29
#893 @ 865,769: 19x18
#894 @ 67,661: 27x22
#895 @ 179,758: 23x20
#896 @ 227,188: 17x27
#897 @ 307,400: 14x23
#898 @ 375,768: 13x16
#899 @ 806,924: 21x11
#900 @ 192,412: 18x10
#901 @ 965,338: 13x15
#902 @ 528,793: 26x17
#903 @ 822,225: 25x26
#904 @ 488,902: 19x17
#905 @ 835,347: 20x20
#906 @ 799,393: 25x20
#907 @ 652,290: 15x23
#908 @ 313,30: 18x21
#909 @ 389,445: 29x22
#910 @ 470,52: 21x11
#911 @ 554,401: 15x20
#912 @ 612,887: 21x22
#913 @ 833,990: 27x10
#914 @ 127,125: 25x24
#915 @ 78,867: 23x26
#916 @ 13,144: 20x19
#917 @ 945,314: 20x13
#918 @ 525,33: 29x26
#919 @ 110,830: 21x15
#920 @ 703,65: 24x20
#921 @ 936,443: 19x25
#922 @ 383,526: 19x19
#923 @ 869,135: 17x15
#924 @ 950,454: 10x24
#925 @ 84,724: 13x8
#926 @ 754,258: 17x13
#927 @ 941,351: 27x20
#928 @ 971,344: 25x16
#929 @ 452,811: 19x16
#930 @ 656,29: 9x5
#931 @ 520,16: 3x3
#932 @ 65,143: 12x9
#933 @ 804,121: 21x19
#934 @ 134,150: 10x16
#935 @ 11,234: 23x17
#936 @ 786,95: 21x10
#937 @ 466,190: 23x22
#938 @ 624,952: 12x26
#939 @ 406,27: 29x26
#940 @ 39,251: 25x27
#941 @ 198,389: 13x25
#942 @ 846,2: 22x29
#943 @ 840,349: 13x21
#944 @ 495,183: 18x29
#945 @ 661,305: 14x19
#946 @ 575,197: 10x21
#947 @ 557,521: 18x17
#948 @ 401,755: 24x13
#949 @ 519,48: 15x27
#950 @ 590,727: 10x26
#951 @ 262,968: 16x14
#952 @ 177,795: 12x13
#953 @ 211,893: 25x22
#954 @ 85,514: 14x19
#955 @ 524,430: 25x21
#956 @ 836,805: 9x6
#957 @ 300,14: 17x28
#958 @ 219,699: 20x11
#959 @ 310,43: 19x16
#960 @ 117,379: 10x29
#961 @ 530,774: 22x25
#962 @ 843,584: 19x13
#963 @ 425,711: 10x10
#964 @ 271,975: 15x11
#965 @ 879,445: 10x11
#966 @ 433,341: 19x16
#967 @ 29,425: 20x24
#968 @ 247,361: 11x19
#969 @ 251,478: 21x22
#970 @ 730,781: 17x24
#971 @ 38,803: 25x29
#972 @ 654,257: 16x29
#973 @ 283,215: 25x14
#974 @ 198,692: 14x28
#975 @ 384,394: 19x13
#976 @ 639,148: 14x28
#977 @ 597,299: 29x16
#978 @ 748,803: 27x12
#979 @ 59,573: 19x23
#980 @ 313,133: 26x12
#981 @ 342,481: 12x18
#982 @ 207,794: 26x15
#983 @ 47,286: 27x27
#984 @ 88,663: 11x17
#985 @ 723,747: 13x17
#986 @ 299,716: 18x22
#987 @ 827,893: 21x21
#988 @ 482,396: 28x28
#989 @ 170,364: 29x12
#990 @ 973,342: 25x10
#991 @ 879,356: 23x28
#992 @ 435,352: 21x16
#993 @ 432,290: 17x29
#994 @ 770,16: 25x26
#995 @ 39,687: 21x23
#996 @ 148,600: 10x13
#997 @ 279,787: 28x22
#998 @ 137,310: 29x14
#999 @ 867,554: 25x26
#1000 @ 949,341: 29x13
#1001 @ 931,220: 23x18
#1002 @ 394,527: 15x13
#1003 @ 914,429: 19x12
#1004 @ 116,315: 23x18
#1005 @ 27,698: 13x22
#1006 @ 872,814: 21x18
#1007 @ 618,470: 13x22
#1008 @ 274,708: 13x23
#1009 @ 869,684: 23x27
#1010 @ 455,560: 23x26
#1011 @ 668,923: 10x16
#1012 @ 863,65: 17x27
#1013 @ 143,179: 12x28
#1014 @ 793,136: 25x23
#1015 @ 14,850: 27x12
#1016 @ 715,326: 19x14
#1017 @ 58,834: 13x28
#1018 @ 657,895: 25x16
#1019 @ 870,752: 26x23
#1020 @ 846,137: 26x23
#1021 @ 877,761: 22x23
#1022 @ 527,234: 29x13
#1023 @ 396,522: 20x26
#1024 @ 919,416: 13x29
#1025 @ 63,549: 29x23
#1026 @ 906,305: 26x16
#1027 @ 91,849: 14x16
#1028 @ 625,658: 15x18
#1029 @ 77,721: 29x15
#1030 @ 958,815: 13x14
#1031 @ 527,104: 11x12
#1032 @ 447,515: 26x17
#1033 @ 610,976: 19x21
#1034 @ 711,174: 21x11
#1035 @ 235,595: 13x19
#1036 @ 750,871: 26x17
#1037 @ 253,593: 13x19
#1038 @ 375,660: 20x25
#1039 @ 10,131: 7x8
#1040 @ 939,344: 23x11
#1041 @ 339,897: 12x26
#1042 @ 602,293: 10x26
#1043 @ 263,352: 15x25
#1044 @ 655,131: 22x13
#1045 @ 95,257: 21x28
#1046 @ 527,107: 26x14
#1047 @ 124,284: 17x16
#1048 @ 589,788: 29x22
#1049 @ 754,342: 10x21
#1050 @ 823,84: 19x21
#1051 @ 506,657: 21x23
#1052 @ 917,933: 17x28
#1053 @ 307,596: 27x13
#1054 @ 239,570: 18x22
#1055 @ 251,652: 14x28
#1056 @ 47,556: 13x20
#1057 @ 106,335: 29x21
#1058 @ 286,262: 19x29
#1059 @ 658,641: 26x10
#1060 @ 888,498: 13x16
#1061 @ 294,574: 14x25
#1062 @ 15,889: 28x12
#1063 @ 56,390: 11x20
#1064 @ 497,322: 12x16
#1065 @ 35,165: 15x3
#1066 @ 353,435: 12x10
#1067 @ 857,55: 16x15
#1068 @ 234,609: 27x20
#1069 @ 269,204: 10x27
#1070 @ 659,655: 22x15
#1071 @ 499,662: 22x28
#1072 @ 649,902: 9x11
#1073 @ 817,482: 16x20
#1074 @ 418,795: 25x20
#1075 @ 813,904: 10x25
#1076 @ 773,609: 21x22
#1077 @ 450,735: 21x16
#1078 @ 739,170: 24x10
#1079 @ 249,103: 14x11
#1080 @ 241,909: 24x14
#1081 @ 122,231: 27x26
#1082 @ 48,734: 11x19
#1083 @ 823,743: 19x18
#1084 @ 142,679: 18x10
#1085 @ 565,850: 16x11
#1086 @ 263,603: 4x7
#1087 @ 970,709: 15x15
#1088 @ 42,840: 15x24
#1089 @ 949,723: 13x21
#1090 @ 781,483: 23x28
#1091 @ 329,241: 26x10
#1092 @ 531,220: 29x26
#1093 @ 880,740: 29x11
#1094 @ 277,313: 10x14
#1095 @ 540,57: 26x24
#1096 @ 830,659: 18x28
#1097 @ 374,606: 12x26
#1098 @ 636,63: 28x11
#1099 @ 933,905: 19x13
#1100 @ 429,586: 17x20
#1101 @ 131,113: 14x22
#1102 @ 340,819: 13x24
#1103 @ 761,58: 16x21
#1104 @ 760,355: 9x10
#1105 @ 231,84: 14x29
#1106 @ 638,367: 28x25
#1107 @ 770,261: 12x19
#1108 @ 367,797: 18x23
#1109 @ 530,348: 18x19
#1110 @ 568,717: 19x24
#1111 @ 467,725: 14x16
#1112 @ 14,175: 27x20
#1113 @ 439,539: 22x28
#1114 @ 202,565: 20x23
#1115 @ 974,280: 25x23
#1116 @ 528,527: 18x17
#1117 @ 547,332: 10x23
#1118 @ 91,584: 13x10
#1119 @ 828,366: 10x28
#1120 @ 86,842: 29x28
#1121 @ 437,1: 25x17
#1122 @ 358,401: 22x23
#1123 @ 468,822: 26x16
#1124 @ 58,844: 13x26
#1125 @ 288,705: 17x11
#1126 @ 322,540: 27x27
#1127 @ 628,838: 24x23
#1128 @ 469,502: 26x10
#1129 @ 937,336: 29x22
#1130 @ 615,676: 15x13
#1131 @ 502,687: 23x14
#1132 @ 235,706: 15x25
#1133 @ 369,36: 11x28
#1134 @ 98,720: 22x13
#1135 @ 465,464: 27x14
#1136 @ 828,202: 21x20
#1137 @ 721,441: 16x28
#1138 @ 69,482: 16x10
#1139 @ 105,755: 23x21
#1140 @ 105,438: 26x13
#1141 @ 846,630: 20x13
#1142 @ 612,19: 25x14
#1143 @ 618,613: 16x13
#1144 @ 491,174: 29x20
#1145 @ 388,399: 11x16
#1146 @ 232,53: 19x13
#1147 @ 493,580: 11x14
#1148 @ 820,76: 13x28
#1149 @ 283,103: 28x11
#1150 @ 332,749: 29x19
#1151 @ 288,269: 20x18
#1152 @ 225,305: 26x25
#1153 @ 640,801: 16x17
#1154 @ 301,161: 25x23
#1155 @ 505,103: 29x25
#1156 @ 179,526: 15x23
#1157 @ 937,318: 26x19
#1158 @ 452,605: 20x11
#1159 @ 895,672: 21x29
#1160 @ 192,740: 20x15
#1161 @ 347,537: 13x11
#1162 @ 633,181: 13x23
#1163 @ 575,914: 17x21
#1164 @ 793,401: 23x20
#1165 @ 296,801: 15x29
#1166 @ 949,398: 22x12
#1167 @ 49,225: 16x10
#1168 @ 283,513: 8x3
#1169 @ 456,497: 16x15
#1170 @ 105,452: 15x17
#1171 @ 170,966: 11x24
#1172 @ 574,795: 12x19
#1173 @ 745,14: 22x23
#1174 @ 255,310: 18x14
#1175 @ 17,326: 24x26
#1176 @ 735,687: 25x20
#1177 @ 764,883: 29x15
#1178 @ 602,572: 18x26
#1179 @ 666,916: 15x12
#1180 @ 246,762: 18x28
#1181 @ 202,451: 14x20
#1182 @ 560,801: 25x10
#1183 @ 817,767: 22x11
#1184 @ 814,313: 17x13
#1185 @ 44,613: 10x24
#1186 @ 503,441: 27x10
#1187 @ 484,374: 18x16
#1188 @ 815,724: 29x19
#1189 @ 923,702: 25x21
#1190 @ 408,25: 14x15
#1191 @ 590,710: 17x16
#1192 @ 4,321: 20x15
#1193 @ 723,759: 24x25
#1194 @ 248,761: 28x28
#1195 @ 246,572: 26x21
#1196 @ 434,463: 25x10
#1197 @ 342,661: 18x16
#1198 @ 699,817: 23x15
#1199 @ 646,371: 10x27
#1200 @ 30,388: 24x13
#1201 @ 50,876: 11x19
#1202 @ 11,849: 11x20
#1203 @ 360,922: 23x27
#1204 @ 532,218: 18x27
#1205 @ 588,718: 19x18
#1206 @ 197,491: 20x14
#1207 @ 0,547: 15x19
#1208 @ 233,556: 17x22
#1209 @ 560,172: 20x16
#1210 @ 806,284: 15x12
#1211 @ 632,674: 27x13
#1212 @ 53,846: 29x22
#1213 @ 126,770: 13x18
#1214 @ 859,429: 19x28
#1215 @ 221,719: 13x10
#1216 @ 209,400: 26x21
#1217 @ 348,934: 12x26
#1218 @ 949,447: 24x24
#1219 @ 521,367: 28x10
#1220 @ 369,659: 24x22
#1221 @ 473,6: 27x21
#1222 @ 532,686: 15x21
#1223 @ 609,960: 17x24
#1224 @ 475,548: 12x24
#1225 @ 712,278: 27x16
#1226 @ 33,162: 21x11
#1227 @ 3,866: 20x20
#1228 @ 785,73: 14x26
#1229 @ 130,179: 25x29
#1230 @ 209,540: 25x28
#1231 @ 220,27: 13x17
#1232 @ 948,474: 18x28
#1233 @ 647,228: 21x21
#1234 @ 362,797: 25x11
#1235 @ 966,265: 16x13
#1236 @ 412,50: 22x17
#1237 @ 779,552: 21x24
#1238 @ 760,63: 26x21
#1239 @ 52,70: 29x23
#1240 @ 47,15: 29x10
#1241 @ 956,575: 20x19
#1242 @ 760,536: 19x24
#1243 @ 635,702: 16x19
#1244 @ 892,166: 28x16
#1245 @ 0,430: 27x19
#1246 @ 883,387: 10x10
#1247 @ 88,666: 11x19
#1248 @ 640,250: 16x20
#1249 @ 21,220: 26x15
#1250 @ 976,55: 14x15
#1251 @ 728,372: 19x12
#1252 @ 14,937: 13x11
#1253 @ 655,125: 25x11
#1254 @ 617,346: 15x27
#1255 @ 943,383: 28x10
#1256 @ 951,221: 29x23
#1257 @ 482,662: 16x28
#1258 @ 806,546: 15x26
#1259 @ 370,604: 23x13
#1260 @ 120,643: 10x22
#1261 @ 98,447: 20x23
#1262 @ 764,800: 24x20
#1263 @ 427,192: 16x23
#1264 @ 115,720: 16x13
#1265 @ 257,945: 14x14
#1266 @ 511,445: 18x26
#1267 @ 633,221: 29x16
#1268 @ 615,819: 28x28
#1269 @ 89,311: 19x14
#1270 @ 231,825: 28x17
#1271 @ 133,0: 29x22
#1272 @ 220,822: 13x18
#1273 @ 699,690: 23x10
#1274 @ 91,441: 22x20
#1275 @ 213,788: 22x19
#1276 @ 873,458: 19x28
#1277 @ 459,490: 23x17
#1278 @ 215,963: 28x23
#1279 @ 56,12: 22x28
#1280 @ 644,937: 17x26
#1281 @ 613,397: 17x20
#1282 @ 559,468: 15x14
#1283 @ 642,244: 17x10
#1284 @ 140,779: 14x22
#1285 @ 232,313: 25x18
#1286 @ 614,737: 22x29
#1287 @ 790,187: 23x20
#1288 @ 166,537: 24x23
#1289 @ 954,368: 15x17
#1290 @ 294,957: 11x16
#1291 @ 95,170: 25x12
#1292 @ 208,831: 20x20
#1293 @ 915,752: 24x21
#1294 @ 790,497: 28x10
#1295 @ 214,12: 18x29
#1296 @ 872,20: 22x24
#1297 @ 84,24: 20x22
#1298 @ 72,859: 10x23
#1299 @ 414,871: 29x11
#1300 @ 148,534: 12x13
#1301 @ 883,17: 25x23
#1302 @ 95,854: 28x17
#1303 @ 264,878: 14x10
#1304 @ 257,942: 23x15
#1305 @ 400,523: 25x10
#1306 @ 125,555: 17x20
#1307 @ 913,427: 19x17
#1308 @ 890,502: 7x3
#1309 @ 868,445: 24x28
#1310 @ 820,759: 25x10
#1311 @ 643,82: 21x21
#1312 @ 249,117: 22x27
#1313 @ 320,935: 29x19
#1314 @ 376,492: 27x25
#1315 @ 467,666: 11x27
#1316 @ 608,583: 20x25
#1317 @ 445,672: 12x19
#1318 @ 428,284: 25x21
#1319 @ 286,411: 18x17
#1320 @ 81,539: 18x27
#1321 @ 600,969: 20x23
#1322 @ 358,571: 11x19
#1323 @ 594,348: 13x16
#1324 @ 401,337: 13x18
#1325 @ 45,843: 16x22
#1326 @ 18,80: 16x26
#1327 @ 946,465: 12x21
#1328 @ 10,206: 18x26
#1329 @ 178,967: 24x17
#1330 @ 722,531: 17x28
#1331 @ 415,525: 29x24
#1332 @ 376,90: 14x14
#1333 @ 103,530: 10x21
#1334 @ 958,103: 28x18
#1335 @ 893,579: 22x15
#1336 @ 913,924: 10x20
#1337 @ 272,436: 20x29
#1338 @ 823,63: 17x29
#1339 @ 2,495: 13x16
#1340 @ 202,2: 22x26
#1341 @ 268,735: 14x14
#1342 @ 261,628: 19x26
#1343 @ 672,888: 16x15
#1344 @ 884,17: 27x11
#1345 @ 318,911: 22x25
#1346 @ 433,843: 20x20
#1347 @ 796,526: 28x18`;

const values = input.split("\n").map(line => {
    line = line.split(" ");

    return {
        id: parseInt(line[0].replace("#", "")),
        x: parseInt(line[2].split(",")[0]),
        y: parseInt(line[2].split(",")[1]),
        width: parseInt(line[3].split("x")[0]),
        height: parseInt(line[3].split("x")[1]),
    }
});

const grid = new Array(1000);
for (let i = 0; i < 1000; i++) grid[i] = new Array(1000).fill(".");

for (let i = 0; i < values.length; i++) {
    apply(values[i]);
}

for (let i = 0; i < values.length; i++) {
    const result = recheck(values[i]);
    if (result){
        return console.log(result);
    }
}


function apply(obj) {
    for (let y = 0; y < obj.height; y++) {
        for(let x = 0; x < obj.width; x++) {
            if (grid[obj.y + y][obj.x + x] == ".") {
                grid[obj.y + y][obj.x + x] = obj.id;
            } else {
                grid[obj.y + y][obj.x + x] = "X";
            }
        }
    }
}

function recheck(obj) {
    for (let y = 0; y < obj.height; y++) {
        for (let x = 0; x < obj.width; x++) {
            if (grid[obj.y +y][obj.x +x] !== obj.id) {
                return false;
            }
        }
    }
    return obj.id
}
