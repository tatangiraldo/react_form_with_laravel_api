<?php

namespace App\Enums;

enum ScheduleType: int {
	case Dia = 1;
    case Tarde = 2;
    case Noche = 3;
}
