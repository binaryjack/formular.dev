/**
 * FORMULAR - Shared Demo Data
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Shared demo data used across component demo files
 */

import { OptionBuilder, OptionsBuilder } from 'formular.dev.lib'

export const onlyOneOption = new OptionBuilder('I Accept').setValue('1').setSequenceId(0).build()

export const mainOptions = new OptionsBuilder()
    .setOptions(
        new OptionBuilder('Option 1').setValue('1').setSequenceId(0),
        new OptionBuilder('Option 2').setValue('2').setSequenceId(1),
        new OptionBuilder('Option 3').setValue('3').setSequenceId(2),
        new OptionBuilder('Option 4').setValue('4').setSequenceId(3)
    )
    .build()

export const mainCheckOptions = new OptionsBuilder()
    .setOptions(
        new OptionBuilder('Option 1').setValue('1').setSequenceId(0),
        new OptionBuilder('Option 2').setValue('2').setSequenceId(1),
        new OptionBuilder('Option 3').setValue('3').setSequenceId(2),
        new OptionBuilder('Option 4').setValue('4').setSequenceId(3),
        new OptionBuilder('Option 5').setValue('5').setSequenceId(4),
        new OptionBuilder('Option 6').setValue('6').setSequenceId(5),
        new OptionBuilder('Option 7').setValue('7').setSequenceId(6),
        new OptionBuilder('Option 8').setValue('8').setSequenceId(7),
        new OptionBuilder('Option 9').setValue('9').setSequenceId(8),
        new OptionBuilder('Option 10').setValue('10').setSequenceId(9),
        new OptionBuilder('Option 11').setValue('11').setSequenceId(10),
        new OptionBuilder('Option 12').setValue('12').setSequenceId(11),
        new OptionBuilder('Option 13').setValue('13').setSequenceId(12),
        new OptionBuilder('Option 14').setValue('14').setSequenceId(13),
        new OptionBuilder('Option 15').setValue('15').setSequenceId(14),
        new OptionBuilder('Option 16').setValue('16').setSequenceId(15),
        new OptionBuilder('Option 17').setValue('17').setSequenceId(16)
    )
    .build()
