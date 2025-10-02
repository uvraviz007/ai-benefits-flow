export type Category = 'Dental' | 'OPD' | 'Vision' | 'Mental Health' | 'Other';


export interface Benefit {
id: string;
title: string;
category: Category;
coverage: string;
description: string;
}